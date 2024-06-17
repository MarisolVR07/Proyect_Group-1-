import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const proposedaction = await prisma.rc_proposedaction.findMany({
      //  include: {rc_departments: true}
    });
    return NextResponse.json(proposedaction, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const question = await req.json();
    const proposedaction = await prisma.rc_proposedaction.create({
      data: {
        ...question,
      },
      // include: {rc_departments: true}
    });
    return NextResponse.json(proposedaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
