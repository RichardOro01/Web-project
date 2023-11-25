import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const report_code = parseInt(id);
  const report = await prisma.report.findFirst({
    where: { report_code },
  });
  if (report) {
    return NextResponse.json(report);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const report_code = parseInt(id);
  await prisma.report.update({ where: { report_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const report_code = parseInt(id);
  await prisma.report.delete({ where: { report_code } });
  return NextResponse.json({ ok: true });
};
