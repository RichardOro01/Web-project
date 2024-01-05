import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/couples/{id}:
 *    get:
 *      tags:
 *        - Couples
 *      summary: Get a couple by id.
 *      description: Get a couple from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the couple to obtain.
 *      responses:
 *        '200':
 *          description: OK
 */

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const couple_code = parseInt(id);
  const couple = await prisma.couple.findFirst({ where: { couple_code } });
  if (couple) {
    return NextResponse.json(couple);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/couples/{id}:
 *    post:
 *      tags:
 *        - Couples
 *      summary: Update a couple.
 *      description: Update a couple.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the couple to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              driver_1: integer
 *              driver_2: integer
 *            example:
 *              driver_1: 1
 *              driver_2: 2
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const couple_code = parseInt(id);
  await prisma.couple.update({ where: { couple_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/couples/{id}:
 *    delete:
 *      tags:
 *        - Couples
 *      summary: Delete a couple by id.
 *      description: Delete a couple from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the couple to delete.
 *      responses:
 *        '200':
 *          description: OK
 */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const couple_code = parseInt(id);
  await prisma.couple.delete({ where: { couple_code } });
  return NextResponse.json({ ok: true });
};