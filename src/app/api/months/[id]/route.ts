import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const month_code = id;
  const month = await prisma.months.findFirst({ where: { month_code } });
  if (month) {
    return NextResponse.json(month);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const month_code = id;
  
  await prisma.months.update({
    where: { month_code },
    data: { report_code: data.report_code
    },
  });

  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const month_code = id;
  await prisma.months.delete({ where: { month_code } });
  return NextResponse.json({ ok: true });
};
