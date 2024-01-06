import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/reports/{id}:
 *    get:
 *      tags:
 *        - Reports
 *      summary: Get report by id.
 *      description: Get report from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the report to obtain.
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
  const report_code = parseInt(id);
  const report = await prisma.report.findFirst({
    where: { report_code },
  });
  if (report) {
    return NextResponse.json(report);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/reports/{id}:
 *    post:
 *      tags:
 *        - Reports
 *      summary: Update a report.
 *      description: Update a report.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the brand to update.
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
 *        '400':
 *          description: Not found
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const report_code = parseInt(id);
  await prisma.report.update({ where: { report_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/reports/{id}:
 *    delete:
 *      tags:
 *        - Reports
 *      summary: Delete a report by id.
 *      description: Delete a report from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the report to delete.
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
  const report_code = parseInt(id);
  await prisma.report.delete({ where: { report_code } });
  return NextResponse.json({ ok: true });
};
