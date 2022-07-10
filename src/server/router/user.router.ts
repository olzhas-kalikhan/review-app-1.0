import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import { createUserSchema } from "../../schema/user.schema";
import { createRouter } from "../createRouter";
import bcrypt from "bcrypt";

export const userRouter = createRouter().mutation("register-user", {
  input: createUserSchema,
  async resolve({ ctx, input }) {
    const { email, name, password } = input;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new trpc.TRPCError({
            code: "CONFLICT",
            message: "User already exists",
          });
        }
      }

      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        cause: e,
      });
    }
  },
});
