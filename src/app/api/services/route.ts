import { ServiceI } from "@/interfaces/Service";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const services = await prisma.service.findMany();
  const tour_groups = await prisma.tourist_group.findMany();
  const countries = await prisma.country.findMany();
  const result: ServiceI[] = services.map((service) => ({
    service_code: service.service_code,
    service_name: service.service_name,
    pickup_place: service.pickup_place,
    pickup_time: service.pickup_time,
    pax: service.pax,
    service_kms: service.service_kms,
    amount: service.amount,
    country: countries.find(
      (country) => country.country_code === service.country_code
    ),
    tour_group: tour_groups.find(
      (tour_group) => tour_group.group_code === service.tour_group_code
    ),
    request_number: service.request_number,
  }));
  return NextResponse.json(result ?? []);
};

export const POST = async (request: Request, response: Response) => {
  const data = await request.json();
  try {
    await prisma.service.create({ data });
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json("Nombre de servicio ya usado", { status: 400 });
    }
    return NextResponse.json("Error creando servicio", { status: 400 });
  }
};
