import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/districts:
 *  get:
 *    tags:
 *      - Districts
 *    summary: Returns the districts
 *    description: Returns the districts
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const districts = await prisma.district.findMany();
  return NextResponse.json(districts);
};

/**
 * @swagger
 *  /api/districts:
 *    post:
 *      tags:
 *        - Districts
 *      summary: Insert a district
 *      description: Insert a district
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
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.district.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de distrito ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando distrito", { status: 400 });
  }
};
