import { NextResponse } from "next/server";
import { deleteElementDB, readDB, writeDB } from "@/services/json";
import { Car } from "@/interfaces/Car";
import prisma from "@/lib/prisma";

export const COLUMN_NAME = "cars" as never;

export const GET = async () => {
  const cars = await prisma.car.findMany();
  const couples = await prisma.couple.findMany();
  const brands = await prisma.brand.findMany();
  const drivers = await prisma.driver.findMany();
  const result: Car[] = cars.map((car) => ({
    number: car.fleet_number,
    plate: car.plate,
    brand: brands.find((b) => b.brand_code === car.brand_code),
    couple:{
      couple_id : couples.find((c) => c.couple_code === car.couple_code)?.couple_code,
      driver1: drivers.find((d) => d.driver_code == couples.find((c) => c.couple_code === car.couple_code)?.driver_1),
      driver2: drivers.find((d) => d.driver_code == couples.find((c) => c.couple_code === car.couple_code)?.driver_2),
    },
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.car.create({ data });
    return NextResponse.json({ ok: true });
    console.log(data)
  } catch (error: any) {
    console.log(error)
    return NextResponse.json("Error creando carro", { status: 400 });
  }
};