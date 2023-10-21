import { Brand } from "@/interfaces/Brand";
import { NextResponse } from "next/server";

let brands: Brand[] = [
  { key: "1", name: "Adidas", fuelType: "motor", seats: 3, spending: 3346 },
  { key: "2", name: "Cerveza", fuelType: "regular", seats: 2, spending: 3346 },
  { key: "3", name: "Ferrari", fuelType: "special", seats: 6, spending: 657 },
];

export const GET = async () => {
  return NextResponse.json(brands);
};
