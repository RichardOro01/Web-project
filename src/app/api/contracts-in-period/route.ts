import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { startDate: string; endDate: string } }
) => {
  const { startDate, endDate } = params;
  const data = await prisma.$queryRaw`
      SELECT * FROM contract
      WHERE contract_date >= ${startDate} AND contract_date <= ${endDate}
    `;
  return NextResponse.json(data ?? []);
};