import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/roadmaps/{car_code}-:-{roadmap_date}:
 *    get:
 *      tags:
 *        - Roadmaps
 *      summary: Get roadmap by id.
 *      description: Get roadmap from database.
 *      parameters:
 *        - in: path
 *          name: car_code
 *          schema:
 *            type: integer
 *          description: The id of the car.
 *        - in: path
 *          name: roadmap_date
 *          schema:
 *            type: date
 *          description: The date of the roadmap.
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
  const [car_code, roadmap_date] = id.split("-:-");
  const record = await prisma.roadmap.findUnique({
    where: {
      roadmap_date_car_code: {
        roadmap_date: roadmap_date,
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
 *  /api/roadmaps/{car_code}-:-{roadmap_date}:
 *    post:
 *      tags:
 *        - Roadmaps
 *      summary: Update a roadmap.
 *      description: Update a roadmap.
 *      parameters:
 *        - in: path
 *          name: car_code
 *          schema:
 *            type: integer
 *          description: The id of the car.
 *        - in: path
 *          name: roadmap_date
 *          schema:
 *            type: date
 *          description: The date of the roadmap.
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
 *        '400':
 *          description: Not found
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const [car_code, roadmap_date] = id.split("-:-");
  await prisma.roadmap.update({
    where: {
      roadmap_date_car_code: {
        roadmap_date: roadmap_date,
        car_code: parseInt(car_code),
      },
    },
    data,
  });

  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/roadmaps/{car_code}-:-{roadmap_date}:
 *    delete:
 *      tags:
 *        - Roadmaps
 *      summary: Delete roadmap by id.
 *      description: Delete roadmap from database.
 *      parameters:
 *        - in: path
 *          name: car_code
 *          schema:
 *            type: integer
 *          description: The id of the car.
 *        - in: path
 *          name: roadmap_date
 *          schema:
 *            type: date
 *          description: The date of the roadmap.
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
  const [car_code, roadmap_date] = id.split("-:-");

  await prisma.roadmap.delete({
    where: {
      roadmap_date_car_code: {
        roadmap_date: roadmap_date,
        car_code: parseInt(car_code),
      },
    },
  });
  return NextResponse.json({ ok: true });
};
