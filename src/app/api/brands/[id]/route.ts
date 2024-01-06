import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";
import { notFound } from "next/navigation"
import {not} from "types-ramda";

/**
 * @swagger
 *  /api/brands/{id}:
 *    get:
 *      tags:
 *        - Brands
 *      summary: Get brand by id.
 *      description: Get brand from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the brand to obtain.
 *      responses:
 *        '200':
 *          description: OK
 *        404:
 *          description: Not found
 */


export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const brand_code = parseInt(id);
  const brand = await prisma.brand.findFirst({ where: { brand_code } });
  if (brand) {
    return NextResponse.json(brand);
  }
  if (!brand){
    notFound();
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/brands/{id}:
 *    post:
 *      tags:
 *        - Brands
 *      summary: Update a brand.
 *      description: Update a brand.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the brand to update.
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
 *        '400':
 *          description: Not found
 */

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const brand_code = parseInt(id);
  await prisma.brand.update({ where: { brand_code }, data });
  return NextResponse.json({ ok: true });
};

/**
 * @swagger
 *  /api/brands/{id}:
 *    delete:
 *      tags:
 *        - Brands
 *      summary: Delete brand by id.
 *      description: Delete brand from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the brand to delete.
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
  try {
    const { id } = params;
    const brand_code = parseInt(id);
    await prisma.brand.delete({ where: { brand_code } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (
      (error as PrismaClientUnknownRequestError).name ===
      "PrismaClientUnknownRequestError"
    ) {
      const bdError = handlePrismaClientUnknownRequestError(error);
      return NextResponse.json(bdError, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
};
