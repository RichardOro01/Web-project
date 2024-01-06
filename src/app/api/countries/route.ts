import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/countries:
 *  get:
 *    tags:
 *      - Countries
 *    summary: Returns the countries
 *    description: Returns the countries
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const countries = await prisma.country.findMany();
  return NextResponse.json(countries);
};

/**
 * @swagger
 *  /api/countries:
 *    post:
 *      tags:
 *        - Countries
 *      summary: Insert a country
 *      description: Insert a country
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              country_name: string
 *              country_code: string
 *            example:
 *              country_name: Cuba
 *              country_code: CU
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.country.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de pais ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando pais", { status: 400 });
  }
};
