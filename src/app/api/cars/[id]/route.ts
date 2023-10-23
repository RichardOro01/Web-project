import { readDB, updateElementDB, writeDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";
import { Car } from "@/interfaces/Car";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await readDB();
  if (db[COLUMN_NAME]) {
    const car = (db[COLUMN_NAME] as Array<Car>).find(
      (car) => car.key === params.id
    );
    return NextResponse.json(car);
  }
  return NextResponse.error();
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  await updateElementDB(COLUMN_NAME, params.id, data);
  return NextResponse.json({ ok: true });
};
