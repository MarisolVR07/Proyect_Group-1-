import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const itemsPerPage = 5;
  try {
    const appliedselfassessment = await prisma.rc_appliedselfassessment.findMany({
        skip: (page - 1) * itemsPerPage, 
        take: itemsPerPage,
        
      
    });
    return NextResponse.json(appliedselfassessment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}