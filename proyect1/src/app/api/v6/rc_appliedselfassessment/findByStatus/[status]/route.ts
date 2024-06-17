import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterStatus } from "@/app/types/api";

export async function GET(req: NextRequest, { params }: ParameterStatus) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const itemsPerPage = 5;
    const fetchedStatus = params.status;

    const appliedSelfAssessment =
      await prisma.rc_appliedselfassessment.findMany({
        where: {
          ASA_Status: fetchedStatus,
        },
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        include: {
          rc_departments: true,
          rc_selfassessments: {
            include: {
              rc_sections: {
                include: {
                  rc_questions: true,
                },
              },
            },
          },
          rc_answers: {
            include: {
              rc_proposedaction: true,
            },
          },
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
