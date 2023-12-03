import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const [car_code, month_date] = id.split("-:-");
  const record = await prisma.discrepancy.findUnique({
    where: {
      month_code_car_code: {
        month_code: month_date,
        car_code: parseInt(car_code),
      },
    },
  });

  if (record) {
    return NextResponse.json({ ok: true, record });
  } else {
    return NextResponse.json({ ok: false, message: "Registro no encontrado" });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  const { id } = params;
  const [car_code, month_code] = id.split("-:-");
  
  await prisma.discrepancy.update({
    where: {
      month_code_car_code: {
        month_code: month_code,
        car_code: parseInt(car_code),
      },
    },
    data: {
      planned_kms: data.planned_kms,
      tours_kms: data.tours_kms,
      difference_kms: data.difference_kms,
      planned_fuel: data.planned_fuel,
      consumed_fuel: data.consumed_fuel,
      dif_spending_fuel: data.dif_spending_fuel,
    },
  });

  return NextResponse.json({ ok: true });
};


export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const [car_code, month_date] = id.split("-:-");
  await prisma.discrepancy.delete({
    where: {
      month_code_car_code: {
        month_code: month_date,
        car_code: parseInt(car_code),
      },
    },
  });
  return NextResponse.json({ ok: true });
};
