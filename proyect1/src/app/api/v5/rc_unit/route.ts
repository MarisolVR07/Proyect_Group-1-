import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const units = await prisma.rc_unit.findMany({
      //  include: {rc_departments: true}
    });
    return NextResponse.json(units, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const unit = await req.json();
    const units = await prisma.rc_unit.create({
      data: {
        ...unit,
      },
      // include: {rc_departments: true}
    });
    return NextResponse.json(units, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
