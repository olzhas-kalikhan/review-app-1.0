import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        {
          try {
            const { email, password } = credentials!;
            const user = await prisma.user.findFirst({
              where: {
                email,
              },
            });
            if (!user || !user.password) {
              console.log("Invalid credentials");
              return null;
            }

            const doPasswordsMatch = await bcrypt.compare(
              password,
              user.password
            );
            if (!doPasswordsMatch) {
              console.log("Invalid credentials");
              return null;
            }
            return user;
          } catch (err) {
            console.log("Authorize error:", err);
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.token,
          refreshToken: user.refreshToken,
        };
      }
      if (user) {
        token = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/Login",
    signOut: "/auth/signout",
    newUser: "/auth/new-user",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
});
