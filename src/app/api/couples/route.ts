import { Couple } from "@/interfaces/Couple"; 
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/couples:
 *  get:
 *    tags:
 *      - Couples
 *    summary: Returns the couples
 *    description: Returns the couples
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const couples = await prisma.couple.findMany();
  const drivers = await prisma.driver.findMany();
  const result: Couple[] = couples.map((couple) => ({
    couple_code: couple.couple_code,
    driver1: drivers.find((driver) => driver.driver_code === couple.driver_1),
    driver2: drivers.find((driver) => driver.driver_code === couple.driver_2),
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/couples:
 *    post:
 *      tags:
 *        - Couples
 *      summary: Insert a couple
 *      description: Insert a couple
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

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.couple.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json("Error creando pareja", { status: 400 });
  }
};