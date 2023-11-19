import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const groups = await prisma.tourist_group.findMany();
  return NextResponse.json(groups);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.tourist_group.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de grupo turistico ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando grupo turistico", { status: 400 });
  }
};
