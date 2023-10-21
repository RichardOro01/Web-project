import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import mockdb from "@/mockdb/mockdb.json";

export const GET = async () => {
  return NextResponse.json(mockdb.brands);
};

export const POST = async (request: Request) => {
  const data = await request.json();
  console.log("3", __dirname);
  const filePath = path.join(process.cwd(), "src/mockdb/mockdb.json");
  const contenido = fs.readFileSync(filePath, "utf-8");
  const datos = JSON.parse(contenido);
  datos.brands.push({ key: Math.random().toString(), ...data });
  const nuevoContenido = JSON.stringify(datos);
  fs.writeFileSync(filePath, nuevoContenido, "utf-8");
  return NextResponse.json({ ok: true });
};
