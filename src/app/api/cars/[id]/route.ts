import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const car_code = parseInt(id);
  const car = await prisma.car.findFirst({ where: { car_code } });
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
  const car_code = parseInt(id);
  await prisma.car.update({ where: { car_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const car_code = parseInt(id);
  await prisma.car.delete({ where: { car_code } });
  return NextResponse.json({ ok: true });
};


