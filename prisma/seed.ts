import { Prisma } from './../node_modules/.prisma/client/index.d';
import { hashSync } from "bcrypt";
import { prisma } from "./prismaClient";
import { categories, _ingredients, products } from "./constants";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

interface GenerateProductItem {
  productId: number;
  pizzaType?: number;
  size?: number;
}

const generateProductItem = (
 { productId, pizzaType, size }: GenerateProductItem
) => {
  return {
    productId,
    size,
    pizzaType,
    price: randomNumber(160, 300),
    
  } as Prisma.ProductItemCreateManyInput;
};

async function up() {
    await prisma.user.createMany({
      data: [
        {
          fullName: 'User',
          email: 'user@gmail.com',
          password: hashSync('1111', 10),
          verified: new Date(),
          role: 'USER',
        },
        {
          fullName: 'Admin',
          email: 'admin@gmail.com',
          password: hashSync('1111', 10),
          verified: new Date(),
          role: 'ADMIN',
        },
      ],
    });

    await prisma.category.createMany({
        data: categories,
    })

     await prisma.ingredient.createMany({
       data: _ingredients,
     });
    
    await prisma.product.createMany({
      data: products,
    });

    const pizza1 = await prisma.product.create({
      data: {
        name: 'Пепероні фреш',
        imageUrl: '/assets/images/pizza/paperoni.webp',
        categoryId: 1,
        ingredients: {
          connect: _ingredients.slice(0, 5),
        },
      },
    });

     const pizza2 = await prisma.product.create({
       data: {
         name: 'Сирна',
         imageUrl:
           '/assets/images/pizza/cheese.webp',
         categoryId: 1,
         ingredients: {
           connect: _ingredients.slice(5, 10),
         },
       },
     });

    const pizza3 = await prisma.product.create({
      data: {
        name: 'Чорізо фреш',
        imageUrl:
          '/assets/images/pizza/chorizo.webp',
        categoryId: 1,
        ingredients: {
          connect: _ingredients.slice(10, 40),
        },
      },
    });

    await prisma.productItem.createMany({
      data: [
        // папперони фреш
        generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
        generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 30 }),
        generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 40 }),
        generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 20 }),
        generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
        generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

        // сырная
        generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
        generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
        generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
        generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
        generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
        generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

        // чоризо фреш
        generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
        generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 30 }),
        generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 40 }),
        generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 20 }),
        generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
        generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

         // остальные продукты
         ...products.map((product, index) =>
          generateProductItem({ productId: index + 1 })
        ),
      ],
    });
  
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '11111',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '22222',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
      },
      {
        previewImageUrl:
          'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
      },
      {
        storyId: 1,
        sourceUrl:
          'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE',
      },
    ],
  });

}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;

}

async function main() {
    try {
      await down();
      await up();
    } catch (error) {
      console.error(error);
    }
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
});
