import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/users/{id}:
 *    get:
 *      tags:
 *        - Users
 *      summary: Get a user by id.
 *      description: Get a users from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the user to obtain.
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Not found
 */

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user_code = parseInt(id);
  const user = await prisma.users.findFirst({ where: { user_code } });
  if (user) {
    return NextResponse.json(user);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/users/{id}:
 *    post:
 *      tags:
 *        - Users
 *      summary: Update a user.
 *      description: Update a user.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the user to update.
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
 *        '400':
 *          description: Not found
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const user_code = parseInt(id);
  await prisma.users.update({ where: { user_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/users/{id}:
 *    delete:
 *      tags:
 *        - Users
 *      summary: Delete user by id.
 *      description: Delete user from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the user to delete.
 *      responses:
 *        '200':
 *          description: OK
 *        '400':
 *          description: Not found
 */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user_code = parseInt(id);
  await prisma.users.delete({ where: { user_code } });
  return NextResponse.json({ ok: true });
};
