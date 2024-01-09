import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/discrepancies/{car_code}-:-{month_date}:
 *    get:
 *      tags:
 *        - Discrepancies
 *      summary: get a discrepancy
 *      description: get a discrepancy
 *      parameters:
 *        - in: path
 *          name: car_code
 *          schema:
 *            type: integer
 *          description: The id of the car.
 *        - in: path
 *          name: month_date
 *          schema:
 *            type: date
 *          description: The date of the month.
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
  const [car_code, month_date] = id.split("-:-");
  const record = await prisma.discrepancy.findUnique({
    where: {
      month_code_car_code: {
        month_code: month_date,
        car_code: parseInt(car_code),
      },
    },
  });
  if (record) {
    return NextResponse.json({ ok: true, record });
  } else {
    return NextResponse.json({ ok: false, message: "Registro no encontrado" });
  }
};

/**
 * @swagger
 *  /api/discrepancies/{car_code}-:-{month_date}:
 *    post:
 *      tags:
 *        - Discrepancies
 *      summary: update a discrepancy
 *      description: update a discrepancy
 *      parameters:
 *        - in: path
 *          name: car_code
 *          schema:
 *            type: integer
 *          description: The id of the car.
 *        - in: path
 *          name: month_date
 *          schema:
 *            type: date
 *          description: The date of the month.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              car_code: integer
 *              planned_kms: double
 *              tours_kms: double
 *              difference_kms: double
 *              planned_fuel: double
 *              consumed_fuel: double
 *              dif_spending_fuel: double
 *              month_code: date
 *            example:
 *              car_code: 1
 *              planned_kms: 10
 *              tours_kms: 5
 *              difference_kms: 5
 *              planned_fuel: 10
 *              consumed_fuel: 9
 *              dif_spending_fuel: 1
 *              month_code: 2027-01-01T00:00:00.000Z
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
  const [car_code, month_code] = id.split("-:-");

  await prisma.discrepancy.update({
    where: {
      month_code_car_code: {
        month_code: month_code,
        car_code: parseInt(car_code),
      },
    },
    data,
  });

  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/discrepancies/{car_code}-:-{month_date}:
 *    delete:
 *      tags:
 *        - Discrepancies
 *      summary: delete a discrepancy
 *      description: delete a discrepancy
 *      parameters:
 *        - in: path
 *          name: car_code
 *          schema:
 *            type: integer
 *          description: The id of the car.
 *        - in: path
 *          name: month_date
 *          schema:
 *            type: date
 *          description: The date of the month.
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
  const [car_code, month_date] = id.split("-:-");
  await prisma.discrepancy.delete({
    where: {
      month_code_car_code: {
        month_code: month_date,
        car_code: parseInt(car_code),
      },
    },
  });
  return NextResponse.json({ ok: true });
};
