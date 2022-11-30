import { type DefaultSession, User,  } from "next-auth";
import { JWT } from 'next-auth/jwt';
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      email: string;
      name: string;
      id: string;
      role: 'client' | 'admin';
      status: 'online' | 'offline';
    } & DefaultSession["user"];
  }

  interface User {
    email: string;
    name: string;
    id: string;
    role: 'client' | 'admin';
    status: 'online' | 'offline';
  }
}

declare module "next-auth/jwt" {
  
  interface JWT {
    user: {
      email: string;
      name: string;
      id: string;
      role: 'client' | 'admin';
      status: 'online' | 'offline';
    }
  }
}
