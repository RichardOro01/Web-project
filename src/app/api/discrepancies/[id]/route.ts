import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/* export const GET = async (request: Request,{ params }: { params: { id: string } }) => {
  const { id } = params;
  const [car__code, month__code]=id.split('-:-')
  console.log(car__code)
  console.log(month__code)
  const roadmap = await prisma.roadmap.findFirst({ where: { month_code_car_code: {car_code: parseInt(car__code), month__code} });
  
  if (roadmap) {
    return NextResponse.json(roadmap);
  }
  return NextResponse.error();
}; */

/* export const GET = async (request: Request,{ params }: { params: { id: string } }) => {
  const data = await request.json();
  const { id } = params;
  const [car_code, month_code]=id.split('-:-')
  await prisma.discrepancy.update({ where: { month_code_car_code: {car_code: parseInt(car_code), month_code} }, data });
  return NextResponse.json({ ok: true });
}; */

/* export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  console.log(data);

  const { id } = params;
  const service_code = parseInt(id);
  await prisma.service.update({ where: { service_code }, data });
  return NextResponse.json({ ok: true });
}; */

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const [car_code, month_date] = id.split("-:-");
  console.log(car_code);
  console.log(month_date);

  await prisma.discrepancy.delete({
    where: {
      month_date_car_code: {
        month_date: month_date,
        car_code: parseInt(car_code),
      },
    },
  });
  return NextResponse.json({ ok: true });
};
