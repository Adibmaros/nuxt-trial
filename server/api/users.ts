import { readFile, writeFile } from "fs/promises";
import path from "path";
import { defineEventHandler, readBody } from "h3";

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
  if (method === "GET") {
    return await readUsers();
  }
  if (method === "POST") {
    const body = await readBody(event);
    const users = await readUsers();
    const id = Date.now().toString();
    const newUser = { id, name: body.name, email: body.email, password: body.password };
    users.push(newUser);
    await writeUsers(users);
    return newUser;
  }
  return { statusCode: 405, message: "Method Not Allowed" };
});
