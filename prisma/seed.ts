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
        id: 1,
        previewImageUrl: '/assets/images/stories/story1.webp',
      },
      {
        id: 2,
        previewImageUrl: '/assets/images/stories/story2.webp',
      },
      {
        id: 3,
        previewImageUrl: '/assets/images/stories/story3.webp',
      },
      {
        id: 4,
        previewImageUrl: '/assets/images/stories/story4.webp',
      },
      {
        id: 5,
        previewImageUrl: '/assets/images/stories/story5.webp',
      },
      {
        id: 6,
        previewImageUrl: '/assets/images/stories/story6.webp',
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl: '/assets/images/stories/stories-item/story1_1.webp',
      },
      {
        storyId: 2,
        sourceUrl: '/assets/images/stories/stories-item/story2_1.webp',
      },
      {
        storyId: 3,
        sourceUrl: '/assets/images/stories/stories-item/story3_1.webp',
      },
      {
        storyId: 3,
        sourceUrl: '/assets/images/stories/stories-item/story3_2.webp',
      },
      {
        storyId: 3,
        sourceUrl: '/assets/images/stories/stories-item/story3_3.webp',
      },
      {
        storyId: 4,
        sourceUrl: '/assets/images/stories/stories-item/story4_1.webp',
      },
      {
        storyId: 5,
        sourceUrl: '/assets/images/stories/stories-item/story5_1.webp',
      },
      {
        storyId: 6,
        sourceUrl: '/assets/images/stories/stories-item/story6_1.webp',
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
