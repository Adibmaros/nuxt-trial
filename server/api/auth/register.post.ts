import bcrypt from "bcrypt";
import prisma from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event);

  // Validasi input
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      message: "Name, email, and password are required",
    });
  }

  // Validasi password minimal 8 karakter
  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: "Password must be at least 8 characters",
    });
  }

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

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
      message: "Failed to register user",
    });
  }
});
