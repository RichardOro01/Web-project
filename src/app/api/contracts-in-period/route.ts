import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request
) => {
    try{
        const url = new URL(request.url);
        const searchParams = new URLSearchParams(url.search);
        const start_date = searchParams.get("startDate");
        const end_date = searchParams.get("endDate");
        if (start_date !== null && end_date !== null){
            const data = await prisma.$queryRaw`
            SELECT * FROM contracts_in_period(${new Date(start_date)},${new Date(end_date)})
          `;
            console.log("Data from GET service:", data);
        return NextResponse.json(data ?? []);
        } else {
            return new Response("Missing startDate or endDate in the request.", { status: 400 });
        }   
    } catch (error) {
        console.error("Error in GET service:", error);
        return new NextResponse()
    }

};