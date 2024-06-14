import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const itemsPerPage = 10;
  try {
    const units = await prisma.rc_unit.findMany({
        skip: (page - 1) * itemsPerPage, 
        take: itemsPerPage,
      
    });
    return NextResponse.json(units, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}