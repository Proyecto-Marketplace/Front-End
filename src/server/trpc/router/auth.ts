import { publicProcedure, router } from '../../trpc/trpc';
import { prisma, Prisma, Role, Status, User } from '../../db/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { registerSchema } from '../../../common/auth';

const userSelect = Prisma.validator<Prisma.UserSelect>()({
  email: true, name: true, id: true, role: true, status: true,
});

export type IUser = Omit<User, 'password'>;

export const authRouter = router({
    //? Register
    register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({ where: { email: input.email } });
      if (user) throw new TRPCError({ code: 'CONFLICT', message: 'Email address already in use' });
      // create user
      const createdUser = await prisma.user.create({
        data: {
          email: input.email.toLowerCase(),
          password: bcrypt.hashSync(input.password, 10),
          name: input.name,
        },
        select: userSelect,
      });

      if (!createdUser) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'User not created ---SERVER_ERROR---' });

      return createdUser;
    }),
});
