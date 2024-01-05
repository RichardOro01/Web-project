import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/fuels/{id}:
 *    get:
 *      tags:
 *        - Fuels
 *      summary: Get fuel by id.
 *      description: Get fuel from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the fuel to obtain.
 *      responses:
 *        '200':
 *          description: OK
 */

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const fuel_code = parseInt(id);
  const fuel = await prisma.fuel.findFirst({ where: { fuel_code } });
  if (fuel) {
    return NextResponse.json(fuel);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/fuels/{id}:
 *    post:
 *      tags:
 *        - Fuels
 *      summary: Update a fuel.
 *      description: Update a fuel.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the fuel to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              fuel_name: string
 *            example:
 *              fuel_name: Gasoline
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
  const fuel_code = parseInt(id);
  await prisma.fuel.update({ where: { fuel_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/fuels/{id}:
 *    delete:
 *      tags:
 *        - Fuels
 *      summary: Delete fuel by id.
 *      description: Delete fuel from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the fuel to delete.
 *      responses:
 *        '200':
 *          description: OK
 */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const fuel_code = parseInt(id);
  await prisma.fuel.delete({ where: { fuel_code } });
  return NextResponse.json({ ok: true });
};
