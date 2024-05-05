import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const institutions = await prisma.rc_institution.findMany({
    //  include: {rc_departments: true}
    });
    return NextResponse.json(institutions, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const institution = await req.json();
    const institutions = await prisma.rc_institution.create({
      data: {
        ...institution,
      },
     // include: {rc_departments: true}, To save department next to user
    });
    return NextResponse.json(institutions, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}