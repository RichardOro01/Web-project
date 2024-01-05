import { Discrepancy } from "@/interfaces/Discrepancy"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";
import { Month } from "@/interfaces/Month";

/**
 * @swagger
 * /api/discrepancies:
 *  get:
 *    tags:
 *      - Discrepancies
 *    summary: Returns the discrepancies
 *    description: Returns the discrepancies
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */


export const GET = async () => {
  const discrepancies = await prisma.discrepancy.findMany();
  const cars = await prisma.car.findMany();
  const meses = await prisma.months.findMany();
  const result: Discrepancy[] = discrepancies.map((discrepancy) => ({
    car: cars.find((car) => car.car_code === discrepancy.car_code) as Car,
    months: meses.find((value) => value.month_code.toISOString() === discrepancy.month_code.toISOString() ) as Month,
    planned_kms: discrepancy.planned_kms,
    tours_kms: discrepancy.tours_kms,
    difference_kms: discrepancy.difference_kms,
    planned_fuel: discrepancy.planned_fuel,
    consumed_fuel: discrepancy.consumed_fuel,
    dif_spending_fuel: discrepancy.dif_spending_fuel,
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/discrepancies:
 *    post:
 *      tags:
 *        - Discrepancies
 *      summary: Insert a discrepancy
 *      description: Insert a discrepancy
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
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.discrepancy.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("discrepancia ya creada", { status: 400 });
    }
    return NextResponse.json("Error creando discrepancia", { status: 400 });
  }
};