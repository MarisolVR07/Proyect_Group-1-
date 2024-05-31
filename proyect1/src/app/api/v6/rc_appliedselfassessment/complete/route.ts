import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Answer {
  ANS_Selection: string;
  ANS_Observations: string | null;
  ANS_WorkDocument: string | null;
  ANS_Question: number;
  rc_proposedaction: ProposedAction | null;
}

interface ProposedAction {
  PAC_Date: Date;
  PAC_Status: string;
  PAC_Responsible: string;
  PAC_Justification: string;
  PAC_Preview: string;
}

export async function GET(req: NextRequest) {
  try {
    const assessments = await prisma.rc_appliedselfassessment.findMany({
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

    return NextResponse.json(assessments, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      ASA_Date,
      ASA_ReviewedBy,
      ASA_MadeBy,
      ASA_Assessment,
      ASA_Department,
      rc_answers,
    } = data;

    const assessment = await prisma.rc_appliedselfassessment.create({
      data: {
        ASA_Date,
        ASA_ReviewedBy,
        ASA_MadeBy,
        ASA_Assessment,
        ASA_Department,
        rc_answers: {
          create: rc_answers.map((answer: Answer) => ({
            ANS_Selection: answer.ANS_Selection,
            ANS_Observations: answer.ANS_Observations,
            ANS_WorkDocument: answer.ANS_WorkDocument,
            ANS_Question: answer.ANS_Question,
            rc_proposedaction: answer.rc_proposedaction
              ? {
                  create: [
                    {
                      PAC_Date: answer.rc_proposedaction.PAC_Date || new Date(),
                      PAC_Status: answer.rc_proposedaction.PAC_Status,
                      PAC_Responsible: answer.rc_proposedaction.PAC_Responsible,
                      PAC_Justification:
                        answer.rc_proposedaction.PAC_Justification,
                      PAC_Preview: answer.rc_proposedaction.PAC_Preview,
                    },
                  ],
                }
              : undefined,
          })),
        },
      },
      include: {
        rc_answers: {
          include: {
            rc_proposedaction: true,
          },
        },
      },
    });

    return NextResponse.json(assessment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
