import { Contract } from "@/interfaces/Contract";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/contracts:
 *  get:
 *    tags:
 *      - Contracts
 *    summary: Returns the contracts
 *    description: Returns the contracts
 *    responses:
 *      200:
 *        description:
 *      400:
 *        description: Not found
 */

export const GET = async () => {
  const contracts = await prisma.contract.findMany();
  const cars = await prisma.car.findMany();
  const countries = await prisma.country.findMany();
  const result: Contract[] = contracts.map((contract) => ({
    contract_code: contract.contract_code,
    applicant_name: contract.applicant_name,
    start_date: contract.start_date,
    end_date: contract.end_date,
    contract_kms: contract.contract_kms,
    contract_amount: contract.contract_amount,
    country: countries.find(
      (country) => country.country_code === contract.contract_country
    ),
    car: cars.find((car) => car.car_code === contract.car_code),
  }));
  return NextResponse.json(result ?? []);
};

/**
 * @swagger
 *  /api/contracts:
 *    post:
 *      tags:
 *        - Contracts
 *      summary: Insert a contract
 *      description: Insert a contract
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
 */


export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.contract.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Nombre de contrato ya usado", code: error.code },
        { status: 400 }
      );
    }
    console.log(error);
    return NextResponse.json(
      { message: "Error creando contrato" },
      { status: 400 }
    );
  }
};
