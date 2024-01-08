import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/drivers/{id}:
 *    get:
 *      tags:
 *        - Drivers
 *      summary: Get driver by id.
 *      description: Get driver from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the driver to obtain.
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
  const driver_code = parseInt(id);
  const driver = await prisma.driver.findFirst({ where: { driver_code } });
  if (driver) {
    return NextResponse.json(driver);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/drivers/{id}:
 *    post:
 *      tags:
 *        - Drivers
 *      summary: Update a driver.
 *      description: Update a driver.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the driver to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              id_driver: string
 *              driver_name: string
 *              address: string
 *              phone: string
 *              district_code: integer
 *              is_free_cover: boolean
 *            example:
 *              id_driver: "01091687492"
 *              driver_name: Miguel
 *              address: calle linea y G
 *              phone: "54632049"
 *              district_code: 1
 *              is_free_cover: true
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
  const driver_code = parseInt(id);
  await prisma.driver.update({ where: { driver_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/drivers/{id}:
 *    delete:
 *      tags:
 *        - Drivers
 *      summary: Delete driver by id.
 *      description: Delete driver from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the driver to delete.
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
  const driver_code = parseInt(id);
  await prisma.driver.delete({ where: { driver_code } });
  return NextResponse.json({ ok: true });
};
