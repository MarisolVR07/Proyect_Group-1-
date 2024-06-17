import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const selfassessments = await prisma.rc_selfassessments.findMany({
    });
    return NextResponse.json(selfassessments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const selfassessment = await req.json();
    const selfassessments = await prisma.rc_selfassessments.create({
      data: {
        ...selfassessment,
      },
    });
    return NextResponse.json(selfassessments, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}