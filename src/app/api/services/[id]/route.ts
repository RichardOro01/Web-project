import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const service_code = parseInt(id);
  const service = await prisma.service.findFirst({ where: { service_code } });
  if (service) {
    return NextResponse.json(service);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  console.log(data);

  const { id } = params;
  const service_code = parseInt(id);
  await prisma.service.update({ where: { service_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const service_code = parseInt(id);
  await prisma.service.delete({ where: { service_code } });
  return NextResponse.json({ ok: true });
};
