import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const fuel_code = parseInt(id);
  const brand = await prisma.fuel.findFirst({ where: { fuel_code } });
  if (brand) {
    return NextResponse.json(brand);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const fuel_code = parseInt(id);
  await prisma.fuel.update({ where: { fuel_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const fuel_code = parseInt(id);
  await prisma.fuel.delete({ where: { fuel_code } });
  return NextResponse.json({ ok: true });
};
