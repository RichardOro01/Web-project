import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const couple_code = parseInt(id);
  const couple = await prisma.couple.findFirst({ where: { couple_code } });
  if (couple) {
    return NextResponse.json(couple);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const couple_code = parseInt(id);
  await prisma.couple.update({ where: { couple_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const couple_code = parseInt(id);
  await prisma.couple.delete({ where: { couple_code } });
  return NextResponse.json({ ok: true });
};