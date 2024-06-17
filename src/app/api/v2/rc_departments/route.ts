import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const departments = await prisma.rc_departments.findMany({});
    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const department = await req.json();
    const departments = await prisma.rc_departments.create({
      data: {
        ...department,
      },
    });
    return NextResponse.json(departments, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
