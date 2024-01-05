import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/tour_groups:
 *  get:
 *    tags:
 *      - Tour groups
 *    summary: Returns the tour groups
 *    description: Returns the tour groups
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const groups = await prisma.tourist_group.findMany();
  return NextResponse.json(groups);
};

/**
 * @swagger
 *  /api/tour_groups:
 *    post:
 *      tags:
 *        - Tour groups
 *      summary: Insert a tour group
 *      description: Insert a tour group
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              group_name: string
 *            example:
 *              group_name: City Explorers
 *      responses:
 *        '200':
 *          description: OK
 */

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.tourist_group.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de grupo turistico ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando grupo turistico", { status: 400 });
  }
};
