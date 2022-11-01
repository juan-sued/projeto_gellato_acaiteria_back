import { prisma } from '../databases/postgreSQL.js';

function getUserByEmail(email) {
  return prisma.users.findFirst({
    where: { email }
  });
}

function insertUser({ name, email, password, phone = '123456789', cpf = '12345678910' }) {
  console.log(name, email, phone, cpf, password);

  return prisma.users.create({
    data: {
      name,
      email,
      phone,
      cpf,
      password
    }
  });
}

export { getUserByEmail, insertUser };
