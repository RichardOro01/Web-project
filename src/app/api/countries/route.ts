import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const countries = await prisma.country.findMany();
  return NextResponse.json(countries);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.country.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de pais ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando pais", { status: 400 });
  }
};
