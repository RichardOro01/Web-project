import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const contract_code = parseInt(id);
  const contract = await prisma.contract.findFirst({
    where: { contract_code },
  });
  if (contract) {
    return NextResponse.json(contract);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const contract_code = parseInt(id);
  await prisma.contract.update({ where: { contract_code }, data });
  return NextResponse.json({ ok: true });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const contract_code = parseInt(id);
  await prisma.contract.delete({ where: { contract_code } });
  return NextResponse.json({ ok: true });
};
