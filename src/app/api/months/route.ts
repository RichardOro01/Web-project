import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/months:
 *  get:
 *    tags:
 *      - Months
 *    summary: Returns the months
 *    description: Returns the months
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const months = await prisma.months.findMany();
  return NextResponse.json(months);
};

/**
 * @swagger
 *  /api/months:
 *    post:
 *      tags:
 *        - Months
 *      summary: Insert a month
 *      description: Insert a month
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              report_code: integer
 *              month_code: date
 *            example:
 *              report_code: 1
 *              month_code: 2027-01-01T00:00:00.000Z
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.months.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("mes ya usado", {
        status: 400,
      });
    }
    console.log(error)
    return NextResponse.json("Error creando mes", { status: 400 });
  }
};
