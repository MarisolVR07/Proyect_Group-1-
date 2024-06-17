import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const sections = await req.json();

    if (!Array.isArray(sections)) {
      return NextResponse.json(
        { error: "Invalid input, expected an array of sections" },
        { status: 400 }
      );
    }

    const createdSections = await prisma.$transaction(
      sections.map((section) =>
        prisma.rc_sections.create({
          data: {
            ...section,
          },
        })
      )
    );

    return NextResponse.json(createdSections, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create sections" },
      { status: 500 }
    );
  }
}
