import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export const COLUMN_NAME = "brands" as never;

export const GET = async () => {
  const brands = await prisma.brand.findMany();
  return NextResponse.json(brands ?? []);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  console.log(await prisma.brand.create({ data }));
  return NextResponse.json({ ok: true });
};
