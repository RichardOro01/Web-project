import { Brand } from "@/interfaces/Brand";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const brands = await prisma.brand.findMany();
  const fuels = await prisma.fuel.findMany();
  const result: Brand[] = brands.map((brand) => ({
    brand_code: brand.brand_code,
    brand_name: brand.brand_name,
    amo_seats: brand.amo_seats,
    spending: brand.spending,
    fuel: fuels.find((fuel) => fuel.fuel_code === brand.fuel_code),
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.brand.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de marca ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando marca", { status: 400 });
  }
};
