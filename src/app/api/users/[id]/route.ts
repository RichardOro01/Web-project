import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user_code = parseInt(id);
  const user = await prisma.users.findFirst({ where: { user_code } });
  if (user) {
    return NextResponse.json(user);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const user_code = parseInt(id);
  await prisma.users.update({ where: { user_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user_code = parseInt(id);
  await prisma.users.delete({ where: { user_code } });
  return NextResponse.json({ ok: true });
};
