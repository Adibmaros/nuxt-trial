import prisma from "~~/server/utils/prisma";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw createError({ statusCode: 400, statusMessage: "name, email and password are required" });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, password },
      select: { id: true, name: true, email: true },
    });
    return user;
  } catch (e: any) {
    if (e?.code === "P2002") throw createError({ statusCode: 409, statusMessage: "Email already exists" });
    throw createError({ statusCode: 500, statusMessage: "Server error" });
  }
});
