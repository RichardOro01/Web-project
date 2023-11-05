import { NextResponse } from "next/server";
import { deleteElementDB, readDB, writeDB } from "@/services/json";
import prisma from "@/lib/prisma";

export const COLUMN_NAME = "fuels" as never;

export const GET = async () => {
  const fuels = await prisma.fuel.findMany();
  return NextResponse.json(fuels ?? []);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  await prisma.fuel.create({ data });
  return NextResponse.json({ ok: true });
};
