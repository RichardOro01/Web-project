import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";
import prisma from "@/lib/prisma";

export const COLUMN_NAME = "cars" as never;

/**
 * @swagger
 * /api/cars:
 *  get:
 *    tags:
 *      - Cars
 *    summary: Returns the cars
 *    description: Returns the cars
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const cars = await prisma.car.findMany();
  const couples = await prisma.couple.findMany();
  const brands = await prisma.brand.findMany();
  const drivers = await prisma.driver.findMany();
  const result: Car[] = cars.map((car) => ({
    car_code: car.car_code,
    fleet_number: car.fleet_number,
    plate: car.plate,
    brand: brands.find((b) => b.brand_code === car.brand_code),
    couple: {
      couple_code: Number(
        couples.find((c) => c.couple_code === car.couple_code)?.couple_code
      ),
      driver1: drivers.find(
        (d) =>
          d.driver_code ==
          couples.find((c) => c.couple_code === car.couple_code)?.driver_1
      ),
      driver2: drivers.find(
        (d) =>
          d.driver_code ==
          couples.find((c) => c.couple_code === car.couple_code)?.driver_2
      ),
    },
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/cars:
 *    post:
 *      tags:
 *        - Cars
 *      summary: Insert a car
 *      description: Insert a car
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              fleet_number: integer
 *              plate: string
 *              couple_code: integer
 *              brand_code: integer
 *            example:
 *              fleet_number: 10
 *              plate: PAA524
 *              couple_code: 1
 *              brand_code: 1
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.car.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json("Error creando carro", { status: 400 });
  }
};
