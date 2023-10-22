import { readDB, updateElementDB, writeDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";
import { Discrepancy } from "@/interfaces/Discrepancy";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const db = await readDB();
  if (db[COLUMN_NAME]) {
    const discrepancy = (db[COLUMN_NAME] as Array<Discrepancy>).find(
      (discrepancy) => discrepancy.key === params.id
    );
    return NextResponse.json(discrepancy);
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
