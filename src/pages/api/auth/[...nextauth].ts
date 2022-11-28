import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { loginSchema } from "../../../common/auth";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
    }),
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: { email: { type: 'email' }, password: { type: 'password' } },
      async authorize(credentials) {
        const creds = await loginSchema.spa(credentials);
        if(!creds.success) throw Error(`${creds.error.issues[0]?.message}`);
        const user = await prisma.user.findUnique({ where: { email: creds.data.email }});

        // if(!user) return null;
        if(!user) throw Error('User not found');
        if(!bcrypt.compareSync(creds.data.password, user.password ?? '')) throw Error('Your password is incorrect');

        const authed_user = await prisma.user.update({
          where: { email: creds.data.email },
          data: { status: 'online' },
          select: { email: true, name: true, role: true, status: true, id: true }
        });

        return authed_user;
      }
    })
  ],
  // Include user.id on session
  callbacks: {
    jwt: ({ token, user, isNewUser }) => {
      // console.log({token, account, profile, user, isNewUser})
      if(user) {
        token.user = user;
      };
      if(isNewUser) {
        token.isNewUser = isNewUser;
      };
      return token;
    },
    session({ session, user, token }) {
      // console.log({ callbacks: { session, user, token } })
      session.user = token.user
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },  
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  // debug: true,
  events: {
    signIn: (msg) => {
      console.log({signIn: msg})
    },
    signOut: (msg) => {
      console.log({signOut: msg})
    },
    createUser: (msg) => {
      console.log({ createUser: msg })
    },
    updateUser: (msg) => {
      console.log({ updateUser: msg })
    },
    session: (msg) => {
      console.log({ session: msg })
    },
  },
};

export default NextAuth(authOptions);
