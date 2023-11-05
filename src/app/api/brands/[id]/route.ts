import { readDB, updateElementDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";
import { prisma } from "../../../../../prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const brand_code = parseInt(id);
  const brand = await prisma.brand.findFirst({ where: { brand_code } });
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
  const brand_code = parseInt(id);
  await prisma.brand.update({ where: { brand_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const brand_code = parseInt(id);
  await prisma.brand.delete({ where: { brand_code } });
  return NextResponse.json({ ok: true });
};
