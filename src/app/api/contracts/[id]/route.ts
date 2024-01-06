import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

/**
 * @swagger
 *  /api/contracts/{id}:
 *    get:
 *      tags:
 *        - Contracts
 *      summary: Get a contract by id.
 *      description: Get a contract from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the contract to obtain.
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
  const contract_code = parseInt(id);
  const contract = await prisma.contract.findFirst({
    where: { contract_code },
  });
  if (contract) {
    return NextResponse.json(contract);
  }
  return NextResponse.error();
};

/**
 * @swagger
 *  /api/contracts/{id}:
 *    post:
 *      tags:
 *        - Contracts
 *      summary: Update a contracts.
 *      description: Update a contracts.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the contract to update.
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              applicant_name: string
 *              start_date: date
 *              end_date: date
 *              contract_kms: double
 *              contract_amount: double
 *              contract_country: string
 *              car_code: integer
 *            example:
 *              applicant_name: Pepe
 *              start_date: 2024-02-02T00:00:00.000Z
 *              end_date: 2024-02-07T00:00:00.000Z
 *              contract_kms: 10
 *              contract_amount: 20
 *              contract_country: US
 *              car_code: 31
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
  try{
    const { id } = params;
    const contract_code = parseInt(id);
    await prisma.contract.update({ where: { contract_code }, data });
    return NextResponse.json({ ok: true });
  }catch(error: any){
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

/**
 * @swagger
 *  /api/contracts/{id}:
 *    delete:
 *      tags:
 *        - Contracts
 *      summary: Delete contract by id.
 *      description: Delete contract from database.
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *          description: The id of the contract to delete.
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
  const contract_code = parseInt(id);
  await prisma.contract.delete({ where: { contract_code } });
  return NextResponse.json({ ok: true });
};
