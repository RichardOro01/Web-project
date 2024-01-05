import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/services/{id}:
 *    get:
 *      tags:
 *        - Services
 *      summary: Get service by id.
 *      description: Get service from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the service to obtain.
 *      responses:
 *        '200':
 *          description: OK
 */


export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const service_code = parseInt(id);
  const service = await prisma.service.findFirst({ where: { service_code } });
  if (service) {
    return NextResponse.json(service);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/services/{id}:
 *    post:
 *      tags:
 *        - Services
 *      summary: Update a service.
 *      description: Update a service.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the service to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              service_name: string
 *              tour_group_code: string
 *              country_code: string
 *              pickup_place: string
 *              pickup_time: time
 *              pax: integer
 *              service_kms: double
 *              amount: double
 *              request_number: integer
 *            example:
 *              service_name: City Tour
 *              tour_group_code: TG001
 *              country_code: US
 *              pickup_place: Coppelia
 *              pickup_time: 10:00
 *              pax: 10
 *              service_kms: 50
 *              amount: 3
 *              request_number: 1
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  console.log(data);

  const { id } = params;
  const service_code = parseInt(id);
  await prisma.service.update({ where: { service_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/services/{id}:
 *    delete:
 *      tags:
 *        - Services
 *      summary: Delete service by id.
 *      description: Delete service from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the service to delete.
 *      responses:
 *        '200':
 *          description: OK
 */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const service_code = parseInt(id);
  await prisma.service.delete({ where: { service_code } });
  return NextResponse.json({ ok: true });
};
