import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/districts/{id}:
 *    get:
 *      tags:
 *        - Districts
 *      summary: Get district by id.
 *      description: Get district from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the district to obtain.
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
  const district_code = parseInt(id);
  const district = await prisma.district.findFirst({
    where: { district_code },
  });
  if (district) {
    return NextResponse.json(district);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/districts/{id}:
 *    post:
 *      tags:
 *        - Districts
 *      summary: Update a district.
 *      description: Update a district.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the district to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              district_name: string
 *            example:
 *              district_name: Cerro
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
  const district_code = parseInt(id);
  await prisma.district.update({ where: { district_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/districts/{id}:
 *    delete:
 *      tags:
 *        - Districts
 *      summary: Delete district by id.
 *      description: Delete district from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the district to delete.
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
  const district_code = parseInt(id);
  await prisma.district.delete({ where: { district_code } });
  return NextResponse.json({ ok: true });
};
