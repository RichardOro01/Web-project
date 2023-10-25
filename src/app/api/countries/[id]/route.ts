import { readDB, updateElementDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";
import { Country } from "@/interfaces/Country";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await readDB();
  if (db[COLUMN_NAME]) {
    const district = (db[COLUMN_NAME] as Array<Country>).find(
      (district) => district.key === params.id
    );
    return NextResponse.json(district);
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
