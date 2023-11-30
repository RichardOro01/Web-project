import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const role_code = parseInt(id);
  const role = await prisma.role.findFirst({ where: { role_code } });
  if (role) {
    return NextResponse.json(role);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const role_code = parseInt(id);
  await prisma.role.update({ where: { role_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const role_code = parseInt(id);
  await prisma.role.delete({ where: { role_code } });
  return NextResponse.json({ ok: true });
};
