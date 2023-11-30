import { Roadmap } from "@/interfaces/Roadmap"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";
import { Car } from "@/interfaces/Car";

export const GET = async () => {
  const roadmaps = await prisma.roadmap.findMany();
  const cars = await prisma.car.findMany();
  const result: Roadmap[] = roadmaps.map((roadmap) => ({
    roadmap_date: roadmap.roadmap_date,
    car: cars.find((car) => car.car_code === roadmap.car_code) as Car,
    kms: roadmap.kms ,
    departure_time: roadmap.departure_time?.toString() ?? "",
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.roadmap.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("roadmap ya creado", { status: 400 });
    }
    return NextResponse.json("Error creando roadmap", { status: 400 });
  }
};