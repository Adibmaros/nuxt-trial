import prisma from "~~/server/utils/prisma";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true } });
  return users;
});
