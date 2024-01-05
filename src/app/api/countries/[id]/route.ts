import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/countries/{id}:
 *    get:
 *      tags:
 *        - Countries
 *      summary: Get a country by id.
 *      description: Get a country from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: The code of the country to obtain.
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
  const country_code = id;
  const country = await prisma.country.findFirst({ where: { country_code } });
  if (country) {
    return NextResponse.json(country);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/countries/{id}:
 *    post:
 *      tags:
 *        - Countries
 *      summary: Update a country.
 *      description: Update a country.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: The code of the country to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              country_name: string
 *            example:
 *              country_name: Cuba
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
  const country_code = id;
  await prisma.country.update({ where: { country_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/countries/{id}:
 *    delete:
 *      tags:
 *        - Countries
 *      summary: Delete a country by id.
 *      description: Delete a country from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: The code of the country to delete.
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
  const country_code = id;
  await prisma.country.delete({ where: { country_code } });
  return NextResponse.json({ ok: true });
};
