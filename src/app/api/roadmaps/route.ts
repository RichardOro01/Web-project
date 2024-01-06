import { Roadmap } from "@/interfaces/Roadmap"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";

/**
 * @swagger
 * /api/roadmaps:
 *  get:
 *    tags:
 *      - Roadmaps
 *    summary: Returns the roadmaps
 *    description: Returns the roadmaps
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const roadmaps = await prisma.roadmap.findMany();
  const cars = await prisma.car.findMany();
  const result: Roadmap[] = roadmaps.map((roadmap) => ({
    roadmap_date: roadmap.roadmap_date,
    car: cars.find((car) => car.car_code === roadmap.car_code) as Car,
    kms: roadmap.kms ,
    departure_time: roadmap.departure_time?.toString() ?? "",
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/roadmaps:
 *    post:
 *      tags:
 *        - Roadmaps
 *      summary: Insert a roadmap
 *      description: Insert a roadmap
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              roadmap_date: date
 *              car_code: integer
 *              kms: double
 *              departure_time: time
 *            example:
 *              roadmap_date: 2025-01-01T00:00:00.000Z
 *              car_code: 35
 *              kms: 62
 *              departure_time: 1970-01-01T09:00:00.000Z
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.roadmap.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("roadmap ya creado", { status: 400 });
    }
    return NextResponse.json("Error creando roadmap", { status: 400 });
  }
};