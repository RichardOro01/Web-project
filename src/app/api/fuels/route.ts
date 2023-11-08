import { Fuel } from "@/interfaces/Fuel";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const fuels = await prisma.fuel.findMany();
  const result: Fuel[] = fuels.map((fuel) => ({
    fuel_code: fuel.fuel_code,
    fuel_name: fuel.fuel_name,
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.fuel.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de combustible ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando combustible", { status: 400 });
  }
};
