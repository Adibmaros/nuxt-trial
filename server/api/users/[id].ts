import prisma from "~~/server/utils/prisma";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const method = event.node.req.method || "GET";
  const idParam = event.context.params?.id;
  const id = parseInt(String(idParam), 10);
  if (isNaN(id)) throw createError({ statusCode: 400, statusMessage: "Invalid id" });

  if (method === "GET") {
    const user = await prisma.user.findUnique({ where: { id }, select: { id: true, name: true, email: true } });
    if (!user) throw createError({ statusCode: 404, statusMessage: "Not Found" });
    return user;
  }

  if (method === "PUT") {
    const body = await readBody(event);
    const { name, email, password } = body;
    try {
      const updated = await prisma.user.update({
        where: { id },
        data: { ...(name !== undefined ? { name } : {}), ...(email !== undefined ? { email } : {}), ...(password !== undefined ? { password } : {}) },
        select: { id: true, name: true, email: true },
      });
      return updated;
    } catch (e: any) {
      if (e?.code === "P2025") throw createError({ statusCode: 404, statusMessage: "Not Found" });
      if (e?.code === "P2002") throw createError({ statusCode: 409, statusMessage: "Email already exists" });
      throw createError({ statusCode: 500, statusMessage: "Server error" });
    }
  }

  if (method === "DELETE") {
    try {
      await prisma.user.delete({ where: { id } });
      return { success: true };
    } catch (e: any) {
      if (e?.code === "P2025") throw createError({ statusCode: 404, statusMessage: "Not Found" });
      throw createError({ statusCode: 500, statusMessage: "Server error" });
    }
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
