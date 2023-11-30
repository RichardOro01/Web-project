import { Discrepancy } from "@/interfaces/Discrepancy"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";
import { Month } from "@/interfaces/Month";

export const GET = async () => {
  const discrepancies = await prisma.discrepancy.findMany();
  const cars = await prisma.car.findMany();
  const meses = await prisma.months.findMany();
  const result: Discrepancy[] = discrepancies.map((discrepancy) => ({
    car: cars.find((car) => car.car_code === discrepancy.car_code) as Car,
    months: meses.find((value) => value.month_code.toISOString() === discrepancy.month_code.toISOString() ) as Month,
    planned_kms: discrepancy.planned_kms,
    tours_kms: discrepancy.tours_kms,
    difference_kms: discrepancy.difference_kms,
    planned_fuel: discrepancy.planned_fuel,
    consumed_fuel: discrepancy.consumed_fuel,
    dif_spending_fuel: discrepancy.dif_spending_fuel,
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.discrepancy.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("discrepancia ya creada", { status: 400 });
    }
    return NextResponse.json("Error creando discrepancia", { status: 400 });
  }
};