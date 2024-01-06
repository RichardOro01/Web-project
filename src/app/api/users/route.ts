import { User } from "@/interfaces/User";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags:
 *      - Users
 *    summary: Returns the users
 *    description: Returns the users
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const users = await prisma.users.findMany();
  const roles = await prisma.role.findMany();
  const result: User[] = users.map((user) => ({
    user_code: user.user_code,
    username: user.username,
    password: user.password,
    name: user.name,
    role: roles.find((role) => role.role_code === user.role_code),
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/users:
 *    post:
 *      tags:
 *        - Users
 *      summary: Insert a user
 *      description: Insert a user
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              username: string
 *              password: string
 *              name: string
 *              role: integer
 *            example:
 *              username: jorge
 *              password: 12345
 *              name: Jorge
 *              role: 1
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.users.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de usuario ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando usuario", { status: 400 });
  }
};
