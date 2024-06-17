import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const answers = await prisma.rc_answers.findMany({
    //  include: {rc_departments: true}
    });
    return NextResponse.json(answers, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const answer = await req.json();
    const answers = await prisma.rc_answers.create({
      data: {
        ...answer,
      },
     // include: {rc_departments: true}, Para guardar departamento junto al usuario
    });
    return NextResponse.json(answers, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}