import { prisma } from '@/prisma/prismaClient';
import { findOrCreateCart } from '@/shared/lib/findOrCreateCart';
import { updateCartTotalAmount } from '@/shared/lib/updateCartTotalAmount';
import { CreateCartItemValues } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, cart: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART GET] Server Error', error);
       return NextResponse.json(
         { error: 'Не вдалося отримати кошик' },
         { status: 500 }
       );
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value || '';

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;
// Пофикчить проблему с добавлением товаров 15.18.12
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
              every: {
                id: { in: data.ingredients },
          },
          some:{},
            },
      },
    });

    // Если товар был найден делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
       await prisma.cartItem.create({
         data: {
           cartId: userCart.id,
           productItemId: data.productItemId,
           quantity: 1,
           ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
         },
       });
    }

   

     const updatedUserCart = await updateCartTotalAmount(token);
     const resp = NextResponse.json(updatedUserCart);
     resp.cookies.set('cartToken', token);
    return resp;
    
  } catch (error) {
    console.log('[CART POST] Server Error', error);
    return NextResponse.json(
      { error: 'Не вдалося створити кошик' },
      { status: 500 }
    );
  }
}