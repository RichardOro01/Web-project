import { updateElementDB, writeDB } from "@/services/json";
import { NextResponse } from "next/server";
import { COLUMN_NAME } from "../route";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const data = await request.json();
  await updateElementDB(COLUMN_NAME, params.id, data);
  return NextResponse.json({ ok: true });
};
