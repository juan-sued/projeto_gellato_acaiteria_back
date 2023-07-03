import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

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
        categoryId: category?.id ?? 4,
        unit_of_measure: 'unit',
        amount: 10,
        quantity_for_unity: 1.5,
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
    ];
    for (const typesOfUser of mockTypesOfUsers) {
      await prisma.typesOfUsers.create({
        data: typesOfUser,
      });
    }
  }
  let userDB = await prisma.users.findFirst();

  if (!userDB)
    async () => {
      const mockUser = {
        name: 'Juan Sued',
        email: 'juansued22@gmail.com',
        password: '112316',
        typeOfUserId: acessLvl?.id ?? 7,
      };

      const passwordEncripted = await bcrypt.hash(mockUser.password, 10);
      userDB = await prisma.users.create({
        data: { ...mockUser, password: passwordEncripted },
      });
    };

  console.log({ ingredient, category, acessLvl, userDB });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
