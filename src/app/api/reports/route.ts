import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const reports = await prisma.report.findMany();
  return NextResponse.json(reports ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.report.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Reporte ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando reporte", { status: 400 });
  }
};
