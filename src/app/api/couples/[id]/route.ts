import { readDB, updateElementDB, writeDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";
import { Couple } from "@/interfaces/Couple";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await readDB();
  if (db[COLUMN_NAME]) {
    const couple = (db[COLUMN_NAME] as Array<Couple>).find(
      (couple) => couple.key === params.id
    );
    return NextResponse.json(couple);
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
