import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { handlePrismaClientUnknownRequestError } from "@/lib/utils";

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
  try {
    const { id } = params;
    const brand_code = parseInt(id);
    await prisma.brand.delete({ where: { brand_code } });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (
      (error as PrismaClientUnknownRequestError).name ===
      "PrismaClientUnknownRequestError"
    ) {
      const bdError = handlePrismaClientUnknownRequestError(error);
      return NextResponse.json(bdError, { status: 400 });
    }
    return NextResponse.json(error, { status: 400 });
  }
};
