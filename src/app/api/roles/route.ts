import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const roles = await prisma.role.findMany();
  return NextResponse.json(roles);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.role.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Description de rol ya usado", {
        status: 400,
      });
    }
    return NextResponse.json("Error creando rol", { status: 400 });
  }
};
