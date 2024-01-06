import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/roles/{id}:
 *    get:
 *      tags:
 *        - Roles
 *      summary: Get a role by id.
 *      description: Get a role from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the roles to obtain.
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
  const role_code = parseInt(id);
  const role = await prisma.role.findFirst({ where: { role_code } });
  if (role) {
    return NextResponse.json(role);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/roles/{id}:
 *    post:
 *      tags:
 *        - Roles
 *      summary: Update a role.
 *      description: Update a role.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the role to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              description: string
 *            example:
 *              description: Admin
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
  const role_code = parseInt(id);
  await prisma.role.update({ where: { role_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/roles/{id}:
 *    delete:
 *      tags:
 *        - Roles
 *      summary: Delete a role by id.
 *      description: Delete a role from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the role to delete.
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
  const role_code = parseInt(id);
  await prisma.role.delete({ where: { role_code } });
  return NextResponse.json({ ok: true });
};
