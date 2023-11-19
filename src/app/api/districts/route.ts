import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const districts = await prisma.district.findMany();
  return NextResponse.json(districts);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.district.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de distrito ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando distrito", { status: 400 });
  }
};
