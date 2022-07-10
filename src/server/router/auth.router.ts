import * as trpc from "@trpc/server";
import { loginUserSchema } from "../../schema/user.schema";
import { createRouter } from "../createRouter";
import bcrypt from "bcrypt";
import { createToken } from "@/utils/auth";
import { serialize } from "cookie";

export const authRouter = createRouter().mutation("login", {
  input: loginUserSchema,
  async resolve({ ctx, input }) {
    const { email, password } = input;

    try {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!user) throw new Error("Invalid credentials");

      const doPasswordsMatch = await bcrypt.compare(
        password,
        user.hashedPassword
      );
      if (!doPasswordsMatch) throw new Error("Invalid credentials");
      const token = await createToken(user);
      ctx.res.setHeader("Set-Cookie", serialize("token", token, { path: "/" }));
      return { token };
    } catch (e) {
      throw new trpc.TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        originalError: e,
      });
    }
  },
});
