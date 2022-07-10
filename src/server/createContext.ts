import { prisma } from "@/utils/prisma";
import * as trpc from "@trpc/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  return { req, res, prisma };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
