import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const sections = await prisma.rc_sections.findMany({
    });
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const section = await req.json();
    const sections = await prisma.rc_sections.create({
      data: {
        ...section,
      },
    });
    return NextResponse.json(sections, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}