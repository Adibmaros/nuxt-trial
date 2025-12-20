import bcrypt from "bcrypt";
import prisma from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "Email and password are required",
    });
  }

  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    // Set session
    await setUserSession(event, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    throw createError({
      statusCode: 500,
      message: "Failed to login",
    });
  }
});
