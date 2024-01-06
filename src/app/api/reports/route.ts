import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/reports:
 *  get:
 *    tags:
 *      - Reports
 *    summary: Returns the reports
 *    description: Returns the reports
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const reports = await prisma.report.findMany();
  return NextResponse.json(reports ?? []);
};

/**
 * @swagger
 *  /api/reports:
 *    post:
 *      tags:
 *        - Reports
 *      summary: Insert a report
 *      description: Insert a report
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              amo_services: integer
 *              amo_rents: integer
 *              income_rents: double
 *              amo_others: integer
 *              income_others: integer
 *              income_total: double
 *            example:
 *              amo_services: 10
 *              amo_rents: 10
 *              income_rents: 20
 *              amo_others: 10
 *              income_others: 20
 *              income_total: 40
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.report.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Reporte ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando reporte", { status: 400 });
  }
};
