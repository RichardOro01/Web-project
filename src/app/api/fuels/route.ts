import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/fuels:
 *  get:
 *    tags:
 *      - Fuels
 *    summary: Returns the fuels
 *    description: Returns the fuels
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const fuels = await prisma.fuel.findMany();
  return NextResponse.json(fuels);
};

/**
 * @swagger
 *  /api/fuels:
 *    post:
 *      tags:
 *        - Fuels
 *      summary: Insert a fuel
 *      description: Insert a fuel
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


export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.fuel.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de combustible ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando combustible", { status: 400 });
  }
};
