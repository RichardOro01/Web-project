import { readDB, updateElementDB, writeDB } from "@/services/json";
import { NextResponse } from "next/server";
import { Driver } from "@/interfaces/Driver";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const driver_code = parseInt(id);
  const driver = await prisma.driver.findFirst({ where: { driver_code } });
  if (driver) {
    return NextResponse.json(driver);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const driver_code = parseInt(id);
  await prisma.driver.update({ where: { driver_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const driver_code = parseInt(id);
  await prisma.driver.delete({ where: { driver_code } });
  return NextResponse.json({ ok: true });
};
