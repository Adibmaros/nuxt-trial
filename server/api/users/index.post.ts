import prisma from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, password } = body;

  await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return { message: "User created successfully" };
});
