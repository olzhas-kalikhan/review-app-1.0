import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";
import { User } from ".prisma/client";
import { prisma } from "./prisma";
import { NextApiRequest } from "next";

export const getUserFromRequest = async (req: NextApiRequest) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const verified = verifyJWTToken(token);
      return verified;
    } catch (e) {
      return null;
    }
  }

  return null;
};

export const verifyJWTToken = async (token: string) => {
  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY!) as {
      email: string;
    };
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
      select: {
        email: true,
        username: true,
      },
    });
    return user;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

export const createToken = async (user: User) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.TOKEN_KEY!,
    {
      expiresIn: "15d",
    }
  );
  return token;
};
