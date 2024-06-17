import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any): Promise<Response> {
  try {
    const { params } = context;
    const { department, status } = params;

    const appliedSelfAssessment =
      await prisma.rc_appliedselfassessment.findMany({
        where: {
          ASA_Department: parseInt(department),
          ASA_Status: status,
        },
      });

    if (!appliedSelfAssessment || appliedSelfAssessment.length === 0) {
      return NextResponse.json(
        { error: "Applied self-assessment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(appliedSelfAssessment);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
