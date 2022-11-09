import { prisma } from '../databases/postgreSQL';
import { ISign } from '../interfaces/authInterfaces';

//=================== GET =====================//
function getUserByEmail(email: string) {
  return prisma.users.findFirst({
    where: { email }
  });
}
function getUserById(id: number) {
  return prisma.users.findFirst({
    where: { id }
  });
}

//================= INSERT ===================//

 async function insertUser( newUser: ISign ) {
  delete newUser.confirmPassword

  const result = await prisma.users.create({ data: newUser });

  if (!result) throw { type: "error" };
  
}

export { getUserByEmail, insertUser, getUserById };
