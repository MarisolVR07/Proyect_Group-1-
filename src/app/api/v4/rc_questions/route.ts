import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const questions = await prisma.rc_questions.findMany({
      //  include: {rc_departments: true}
    });
    return NextResponse.json(questions, { status: 200 });
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
    const questions = await prisma.rc_questions.create({
      data: {
        ...question,
      },
      // include: {rc_departments: true}
    });
    return NextResponse.json(questions, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
