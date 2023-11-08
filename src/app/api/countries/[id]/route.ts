import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const country_code = id;
  const country = await prisma.country.findFirst({ where: { country_code } });
  if (country) {
    return NextResponse.json(country);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const country_code = id;
  await prisma.country.update({ where: { country_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const country_code = id;
  await prisma.country.delete({ where: { country_code } });
  return NextResponse.json({ ok: true });
};
