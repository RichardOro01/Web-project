import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const brand_code = parseInt(id);
  const free_cover = await prisma.brand.findFirst({ where: { brand_code } });
  if (free_cover) {
    return NextResponse.json(free_cover);
  }
  return NextResponse.error();
};
