import prisma from "@/app/lib/prisma";
import { ParameterFullName } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterFullName) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const itemsPerPage = 10;
    const fetchedName = params.name;
    const response = await prisma.rc_unit.findMany({
      where: {
        UND_Name: { startsWith: fetchedName },
      },
      skip: (page - 1) * itemsPerPage, 
      take: itemsPerPage,
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json({ error: "Unit not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
