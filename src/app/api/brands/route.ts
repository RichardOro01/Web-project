import { Brand } from "@/interfaces/Brand";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/brands:
 *  get:
 *    tags:
 *      - Brands
 *    summary: Returns the brands
 *    description: Returns the brands
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const brands = await prisma.brand.findMany();
  const fuels = await prisma.fuel.findMany();
  const result: Brand[] = brands.map((brand) => ({
    brand_code: brand.brand_code,
    brand_name: brand.brand_name,
    amo_seats: brand.amo_seats,
    spending: brand.spending,
    fuel: fuels.find((fuel) => fuel.fuel_code === brand.fuel_code),
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/brands:
 *    post:
 *      tags:
 *        - Brands
 *      summary: Insert a brand
 *      description: Insert a brand
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              brand_name: string
 *              amo_seats: integer
 *              spending: double
 *              fuel_code: integer
 *            example:
 *              brand_name: Toyota
 *              amo_seats: 5
 *              spending: 7.5
 *              fuel_code: 1
 *      responses:
 *        '200':
 *          description: OK
 */



export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.brand.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de marca ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando marca", { status: 400 });
  }
};
