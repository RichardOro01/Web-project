import { Contract } from "@/interfaces/Contract";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.contract.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de contrato ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando contrato", { status: 400 });
  }
};
