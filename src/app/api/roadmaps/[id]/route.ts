import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const [car_code, roadmap_date] = id.split("-:-");
  const record = await prisma.roadmap.findUnique({
    where: {
      roadmap_date_car_code: {
        roadmap_date: roadmap_date,
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
  const [car_code, roadmap_date] = id.split("-:-");
  console.log(data)
  await prisma.roadmap.update({
    where: {
      roadmap_date_car_code: {
        roadmap_date: roadmap_date,
        car_code: parseInt(car_code),
      },
    },
    data
  });

  return NextResponse.json({ ok: true });
};



export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const [car_code, roadmap_date] = id.split("-:-");
  console.log(car_code);
  console.log(roadmap_date);

  await prisma.roadmap.delete({ where: { roadmap_date_car_code: { roadmap_date: roadmap_date, car_code: parseInt(car_code), }, }, });
  return NextResponse.json({ ok: true });
};
