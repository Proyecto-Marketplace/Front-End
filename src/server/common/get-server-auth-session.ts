import { type GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

type Context = {req: GetServerSidePropsContext["req"]; res: GetServerSidePropsContext["res"]};

export const getServerAuthSession = async (ctx: Context) => await unstable_getServerSession(ctx.req, ctx.res, authOptions);
