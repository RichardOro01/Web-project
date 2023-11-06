import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const COLUMN_NAME = "brands" as never;

export const GET = async () => {
  const brands = await prisma.brand.findMany();
  return NextResponse.json(brands ?? []);
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
