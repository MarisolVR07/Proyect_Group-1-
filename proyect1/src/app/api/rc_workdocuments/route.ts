import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const workdocuments = await prisma.rc_workdocuments.findMany({
    //  include: {rc_departments: true}
    });
    return NextResponse.json(workdocuments, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const workdocument = await req.json();
    const workdocuments = await prisma.rc_workdocuments.create({
      data: {
        ...workdocument,
      },
     // include: {rc_departments: true}, Para guardar departamento junto al usuario
    });
    return NextResponse.json(workdocuments, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}