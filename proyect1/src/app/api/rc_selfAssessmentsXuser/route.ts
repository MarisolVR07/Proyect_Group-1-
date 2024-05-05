import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const selfassesmentxuser = await prisma.rc_selfassessmentsxuser.findMany({
    //  include: {rc_departments: true}
    });
    return NextResponse.json(selfassesmentxuser, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const selfassessmentxuser = await req.json();
    const selfassessmentxusers = await prisma.rc_selfassessmentsxuser.create({
      data: {
        ...selfassessmentxuser,
      },
     // include: {rc_departments: true}
    });
    return NextResponse.json(selfassessmentxusers, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
