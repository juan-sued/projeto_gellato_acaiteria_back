import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  const category = await prisma.categories.findFirst();

  if (!category) {
    const categories = [
      {
        name: 'categoria 1',
        description: 'descrição categoria 1',
      },
      {
        name: 'categoria 2',
        description: 'descrição categoria 2',
      },
      {
        name: 'categoria 3',
        description: 'descrição categoria 3',
      },
    ];

    for (const category of categories) {
      await prisma.categories.create({
        data: category,
      });
    }
  }

  const ingredient = await prisma.stock.findFirst();

  if (!ingredient) {
    const stocks = [
      {
        title: 'Product 1',
        image: 'image1.jpg',
        price: 9.99,
        description: 'Description 1',
        categoryId: 1,
        unit_of_measure: 'unit',
        amount: 10,
        quantity_for_unity: 1.5,
      },
      {
        title: 'Product 2',
        image: 'image2.jpg',
        price: 19.99,
        description: 'Description 2',
        categoryId: 2,
        unit_of_measure: 'unit',
        amount: 20,
        quantity_for_unity: 1.2,
      },
      {
        title: 'Product 3',
        image: 'image3.jpg',
        price: 29.99,
        description: 'Description 3',
        categoryId: 3,
        unit_of_measure: 'unit',
        amount: 15,
        quantity_for_unity: 2.0,
      },
    ];

    for (const stock of stocks) {
      await prisma.stock.create({
        data: stock,
      });
    }
  }

  const acessLvl = await prisma.typesOfUsers.findFirst();

  if (!acessLvl) {
    const mockTypesOfUsers = [
      {
        name: 'Admin',
        access: 'High',
        description: 'Administrator user',
      },
      {
        name: 'User',
        access: 'low',
        description: 'Regular user',
      },
      // Adicione mais objetos de mock conforme necessário
    ];
    for (const typesOfUser of mockTypesOfUsers) {
      await prisma.typesOfUsers.create({
        data: typesOfUser,
      });
    }
  }

  console.log({ ingredient, category, acessLvl });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
