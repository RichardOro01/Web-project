import { Free_cover } from "@/interfaces/Free_cover";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const free_covers = await prisma.free_cover.findMany();
  const brands = await prisma.brand.findMany();
  const drivers = await prisma.driver.findMany();
  const result: Free_cover[] = free_covers.map((free_cover) => ({
    brand: brands.find((brand) => brand.brand_code === free_cover.brand_code),
    driver: drivers.find((driver) => driver.driver_code === free_cover.driver_code),
  }));
  return NextResponse.json(result ?? []);
};
