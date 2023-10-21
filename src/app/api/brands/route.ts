import { NextResponse } from "next/server";
import { deleteElementDB, readDB, writeDB } from "@/services/json";

const COLUMN_NAME = "brands";

export const GET = async () => {
  const db = readDB();
  return NextResponse.json(db[COLUMN_NAME] ?? []);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  writeDB(COLUMN_NAME, data);
  return NextResponse.json({ ok: true });
};

export const DELETE = async (request: Request) => {
  const key = await request.json();
  deleteElementDB(COLUMN_NAME, key);
  return NextResponse.json({ ok: true });
};
