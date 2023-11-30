import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const months = await prisma.months.findMany();
  return NextResponse.json(months);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.months.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("mes ya usado", {
        status: 400,
      });
    }
    console.log(error)
    return NextResponse.json("Error creando mes", { status: 400 });
  }
};
