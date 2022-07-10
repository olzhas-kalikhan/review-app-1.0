import { prisma } from "@/utils/prisma";
import * as trpc from "@trpc/server";
import { getUserFromRequest } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user = await getUserFromRequest(req);
  return { req, res, prisma, user };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
