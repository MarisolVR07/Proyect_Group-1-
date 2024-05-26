import prisma from "@/app/lib/prisma";
import { ParameterFullName } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterFullName) {
  try {
    const fetchedName = params.fullname;
    const response = await prisma.rc_departments.findMany({
      where: {
        DPT_Name: { contains: fetchedName },
      },include:{rc_unit:true}
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json(
      { error: "Department not found" },
      { status: 404 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
