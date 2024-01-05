import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/months/{id}:
 *    get:
 *      tags:
 *        - Months
 *      summary: Get a month by date.
 *      description: Get a month from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: date
 *          description: The date of the month to obtain.
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
  const month_code = id;
  const month = await prisma.months.findFirst({ where: { month_code } });
  if (month) {
    return NextResponse.json(month);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/months/{id}:
 *    post:
 *      tags:
 *        - Months
 *      summary: Update a month.
 *      description: Update a month.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: date
 *          description: The date of the month to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              report_code: integer
 *              month_code: date
 *            example:
 *              report_code: 1
 *              month_code: 2026-01-01T00:00:00.000Z
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
  const month_code = id;
  
  await prisma.months.update({
    where: { month_code },
    data
  });

  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/months/{id}:
 *    delete:
 *      tags:
 *        - Months
 *      summary: Delete a month by date.
 *      description: Delete a month from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: date
 *          description: The date of the month to delete.
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
  const month_code = id;
  await prisma.months.delete({ where: { month_code } });
  return NextResponse.json({ ok: true });
};
