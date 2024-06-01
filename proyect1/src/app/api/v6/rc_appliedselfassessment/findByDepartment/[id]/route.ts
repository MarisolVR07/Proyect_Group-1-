import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/app/types/api";


export async function GET(req: NextRequest, {params}:ParameterId){
  try {
    const fetchedId = params.id;
    
    const appliedSelfAssessment =
      await prisma.rc_appliedselfassessment.findMany({
        where: {
          ASA_Department: parseInt(fetchedId),
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
