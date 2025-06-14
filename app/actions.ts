'use server';

import { CheckoutFormValues } from '@/shared/components/shared/checkout/schemas/checkoutFormSchemas';
import { prisma } from '@/prisma/prismaClient';
import { OrderStatus, Prisma } from '@prisma/client';
import { cookies } from 'next/headers';
import { createPayment, refundPayment, sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components/shared';
import { DELIVERY_PRICE } from '@/shared/constants/pizza';
import { getUserSession } from '@/shared/lib/getUserSassion';
import { hashSync } from 'bcrypt';
import { VerificationUserTemplate } from '@/shared/components/shared/emailTemplate/VerificationUser';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Нашол карзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // Если карзина не знайдена
    if (!userCart) {
      throw new Error('Cart not found');
    }
    // Если карзина пуста
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    // Создаем заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        email: data.email,
        address: data.address,
        comment: data.comment,
        status: OrderStatus.PENDING,
        totalAmount: userCart.totalAmount + DELIVERY_PRICE,
        items: userCart.items,
      },
    });

    // Очищаем totalAmount корзины
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // Создание ссылки оплаты

    const paymentUrl = await createPayment({
      orderId: order.id.toString(),
      amount: userCart.totalAmount + DELIVERY_PRICE,
      email: data.email,
      phone: data.phone,
      clientLastName: data.lastName,
      products: userCart.items.map((item) => ({
        name: item.productItem.product.name,
        price: item.productItem.price,
        count: item.quantity,
      })),
    });

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentUrl.orderReference,
      },
    });

    sendEmail(
      data.email,
      'Оплата замовлення №' + order.id,
      await PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: paymentUrl.invoiceUrl,
      })
    );

    // Відміна платежу
    // await refundPayment({
    //   orderReference: 'ORDER-36 - 8d6ef2b3-e686-4851-97cf-46b6c82e8c47',
    //   amount: 299,
    // });

    return paymentUrl.invoiceUrl;
  } catch (error) {
    console.error('[CreateOrder] Server error', error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Користувача не знайдено');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    })

   await prisma.user.update({
     where: {
       id: Number(currentUser.id),
     },
     data: {
       fullName: body.fullName,
       email: body.email,
       password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
     },
   });

  } catch (error) {
    console.error('[UpdateUserInfo] Server error', error);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      }
    })

    if (user) {
      if (!user.verified) {
        throw new Error(
          'Пошта не підтверджена.'
        );
      }

      throw new Error(
        'Користувач з таким email вже зареєстрований'
      );
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    sendEmail(
      createdUser.email,
      'Pizza Time - Підтвердження пошти',
      await VerificationUserTemplate({
       code,
      })
    );

   } catch (error) {
    throw new Error('Помилка при реєстрації користувача: ' + error);
   }
}