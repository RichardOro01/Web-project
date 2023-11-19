import { Couple } from "@/interfaces/Couple"; 
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const couples = await prisma.couple.findMany();
  const drivers = await prisma.driver.findMany();
  const result: Couple[] = couples.map((couple) => ({
    couple_id: couple.couple_code,
    driver1: drivers.find((driver) => driver.driver_code === couple.driver_1),
    driver2: drivers.find((driver) => driver.driver_code === couple.driver_2),
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.couple.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json("Error creando pareja", { status: 400 });
  }
};