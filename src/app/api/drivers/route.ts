import { Driver } from "@/interfaces/Driver";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const drivers = await prisma.driver.findMany();
  const districs = await prisma.district.findMany();
  const result: Driver[] = drivers.map((driver) => ({
    id_driver: driver.id_driver,
    driver_name: driver.driver_name,
    address: driver.address,
    phone: driver.phone,
    is_free_cover: driver.is_free_cover,
    driver_code:driver.driver_code,
    district: districs.find((distric) => distric.district_code === driver.district_code),
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.driver.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.log(error)
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de conductor ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando conductor", { status: 400 });
  }
};
