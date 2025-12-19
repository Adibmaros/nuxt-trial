import { readFile, writeFile } from "fs/promises";
import path from "path";
import { defineEventHandler, readBody, createError } from "h3";

const DATA_FILE = path.join(process.cwd(), "data", "users.json");

async function readUsers() {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}
async function writeUsers(users: any[]) {
  await writeFile(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method || "GET";
  const id = event.context.params?.id;
  const users = await readUsers();
  const idx = users.findIndex((u: any) => u.id === id);

  if (method === "GET") {
    return idx === -1 ? null : users[idx];
  }

  if (method === "PUT") {
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: "Not Found" });
    const body = await readBody(event);
    users[idx] = { ...users[idx], name: body.name ?? users[idx].name, email: body.email ?? users[idx].email, password: body.password ?? users[idx].password };
    await writeUsers(users);
    return users[idx];
  }

  if (method === "DELETE") {
    if (idx === -1) throw createError({ statusCode: 404, statusMessage: "Not Found" });
    users.splice(idx, 1);
    await writeUsers(users);
    return { success: true };
  }

  throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
});
