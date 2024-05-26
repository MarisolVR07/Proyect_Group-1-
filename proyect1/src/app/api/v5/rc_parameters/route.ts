import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const parameters = await prisma.rc_parameters.findMany({});
    return NextResponse.json(parameters, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const parameter = await req.json();
    const parameters = await prisma.rc_parameters.create({
      data: {
        ...parameter,
      },
    });
    return NextResponse.json(parameters, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
