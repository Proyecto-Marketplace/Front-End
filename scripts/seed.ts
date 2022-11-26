import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.$connect();
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@gmail.com',
          name: 'Admin',
          password: bcrypt.hashSync('admin123', 10)
        }
      ]
    })
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();