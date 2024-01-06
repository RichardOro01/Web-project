import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const tourGroupCode = params.id;
  const data =
    await prisma.$queryRaw`SELECT * FROM drivers_worked_tour_group(${tourGroupCode})`;
  return NextResponse.json(data ?? []);
};
