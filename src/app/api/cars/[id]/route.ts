import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const fleet_number = parseInt(id);
  const car = await prisma.car.findFirst({ where: { fleet_number } });
  if (car) {
    return NextResponse.json(car);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const fleet_number = parseInt(id);
  await prisma.car.update({ where: { fleet_number }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const fleet_number = parseInt(id);
  await prisma.car.delete({ where: { fleet_number } });
  return NextResponse.json({ ok: true });
};


