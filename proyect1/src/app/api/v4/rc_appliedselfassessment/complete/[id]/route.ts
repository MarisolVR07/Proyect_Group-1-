import prisma from "@/app/lib/prisma";
import { ParameterId } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const appliedselfassessment =
      await prisma.rc_appliedselfassessment.findMany({
        include: {
          rc_answers: {
            include: {
              rc_proposedaction: true,
            },
          },
        },
      });
    return NextResponse.json(appliedselfassessment, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);

    await prisma.rc_questions.deleteMany({
      where: {
        QES_Section: {
          in: (
            await prisma.rc_sections.findMany({
              where: { SEC_SelfAssessments: fetchedId },
              select: { SEC_Id: true },
            })
          ).map((section) => section.SEC_Id),
        },
      },
    });

    await prisma.rc_sections.deleteMany({
      where: { SEC_SelfAssessments: fetchedId },
    });

    const response = await prisma.rc_appliedselfassessment.delete({
      where: {
        ASA_Id: fetchedId,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const newData = await req.json();

    const updatedAppliedSelfAssessment =
      await prisma.rc_appliedselfassessment.update({
        where: { ASA_Id: fetchedId },
        data: {
          ASA_Id: fetchedId,
          ASA_Date: newData.ASA_Date,
          ASA_ReviewedBy: newData.ASA_ReviewedBy,
          ASA_MadeBy: newData.ASA_MadeBy,
          ASA_Assessment: newData.ASA_Assessment,
          ASA_Department: newData.ASA_Department,
          rc_answers: {
            upsert: (newData.rc_answers ?? []).map((answer: any) => ({
              where: { ANS_Id: answer.ANS_Id },
              update: {
                ANS_Id: answer.ANS_Id,
                ANS_Selection: answer.ANS_Selection,
                ANS_Observations: answer.ANS_Observations,
                ANS_WorkDocument: answer.ANS_WorkDocument,
                ANS_Question: answer.ANS_Question,
                rc_proposedaction: {
                  upsert: (answer.rc_proposedaction ?? []).map(
                    (action: any) => ({
                      where: { PAC_Id: action.PAC_Id },
                      update: {
                        PAC_Id: action.PAC_Id,
                        PAC_Date: action.PAC_Date,
                        PAC_Status: action.PAC_Status,
                        PAC_Responsible: action.PAC_Responsible,
                        PAC_Justification: action.PAC_Justification,
                        PAC_Preview: action.PAC_Preview,
                      },
                      create: {
                        PAC_Date: action.PAC_Date,
                        PAC_Status: action.PAC_Status,
                        PAC_Responsible: action.PAC_Responsible,
                        PAC_Justification: action.PAC_Justification,
                        PAC_Preview: action.PAC_Preview,
                      },
                    })
                  ),
                },
              },
              create: {
                ANS_Selection: answer.ANS_Selection,
                ANS_Observations: answer.ANS_Observations,
                ANS_WorkDocument: answer.ANS_WorkDocument,
                ANS_Question: answer.ANS_Question,
                rc_proposedaction: {
                  create: (answer.rc_proposedaction ?? []).map(
                    (action: any) => ({
                      PAC_Date: action.PAC_Date,
                      PAC_Status: action.PAC_Status,
                      PAC_Responsible: action.PAC_Responsible,
                      PAC_Justification: action.PAC_Justification,
                      PAC_Preview: action.PAC_Preview,
                    })
                  ),
                },
              },
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

    return NextResponse.json(updatedAppliedSelfAssessment, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

