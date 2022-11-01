import { prisma } from '../databases/postgreSQL.js';

function getUserByEmail(email) {
  return prisma.users.findFirst({
    where: { email }
  });
}

function insertUser({ name, email, encryptedPassword, phone = 'null', cpf = 'null' }) {
  return prisma.users.create({
    data: {
      name,
      email,
      phone,
      cpf,
      password: encryptedPassword
    }
  });
}

export { getUserByEmail, insertUser };
