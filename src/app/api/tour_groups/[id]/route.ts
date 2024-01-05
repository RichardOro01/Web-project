import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * @swagger
 *  /api/tour_groups/{id}:
 *    get:
 *      tags:
 *        - Tour groups
 *      summary: Get a tour group by id.
 *      description: Get a tour group from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the tour group to obtain.
 *      responses:
 *        '200':
 *          description: OK
 */

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const group_code = id;
  const group = await prisma.tourist_group.findFirst({ where: { group_code } });
  if (group) {
    return NextResponse.json(group);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/tour_groups/{id}:
 *    post:
 *      tags:
 *        - Tour groups
 *      summary: Update a tour group.
 *      description: Update a tour group.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the tour group to update.
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

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const group_code = id;
  await prisma.tourist_group.update({ where: { group_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/tour_groups/{id}:
 *    delete:
 *      tags:
 *        - Tour groups
 *      summary: Delete tour group by id.
 *      description: Delete tour group from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the tour group to delete.
 *      responses:
 *        '200':
 *          description: OK
 */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const group_code = id;
  await prisma.tourist_group.delete({ where: { group_code } });
  return NextResponse.json({ ok: true });
};
