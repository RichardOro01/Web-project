import { readDB, updateElementDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";
import { District } from "@/interfaces/District";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await readDB();
  if (db[COLUMN_NAME]) {
    const district = (db[COLUMN_NAME] as Array<District>).find(
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
