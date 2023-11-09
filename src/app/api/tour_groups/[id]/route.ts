import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const group_code = id;
  const group = await prisma.tourist_group.findFirst({ where: { group_code } });
  if (group) {
    return NextResponse.json(group);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const group_code = id;
  await prisma.tourist_group.update({ where: { group_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const group_code = id;
  await prisma.tourist_group.delete({ where: { group_code } });
  return NextResponse.json({ ok: true });
};
