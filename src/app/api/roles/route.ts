import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/roles:
 *  get:
 *    tags:
 *      - Roles
 *    summary: Returns the roles
 *    description: Returns the roles
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */


export const GET = async () => {
  const roles = await prisma.role.findMany();
  return NextResponse.json(roles);
};

/**
 * @swagger
 *  /api/roles:
 *    post:
 *      tags:
 *        - Roles
 *      summary: Insert a role
 *      description: Insert a role
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
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.role.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Description de rol ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando rol", { status: 400 });
  }
};
