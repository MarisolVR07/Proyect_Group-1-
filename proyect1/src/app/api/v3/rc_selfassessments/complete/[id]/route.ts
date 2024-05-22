import prisma from "@/app/lib/prisma";
import { ParameterId } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);

    const response = await prisma.rc_selfassessments.findUnique({
      where: {
        SAT_Id: fetchedId,
      },
      include: {
        rc_sections: {
          include: {
            rc_questions: true,
          },
        },
      },
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json(
      { error: "Assessment not found" },
      { status: 404 }
    );
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
    const selfassessmentData = await req.json();

    const updatedSelfassessment = await prisma.rc_selfassessments.update({
      where: {
        SAT_Id: fetchedId,
      },
      data: {
        SAT_Status: selfassessmentData.SAT_Status,
        SAT_Audit: selfassessmentData.SAT_Audit,
        SAT_Description: selfassessmentData.SAT_Description,
        rc_sections: {
          upsert: selfassessmentData.rc_sections.map((section: any) => ({
            where: { SEC_Id: section.SEC_Id },
            update: {
              SEC_Name: section.SEC_Name,
              SEC_Number: section.SEC_Number,
              rc_questions: {
                upsert: section.rc_questions.map((question: any) => ({
                  where: { QES_Id: question.QES_Id },
                  update: {
                    QES_Text: question.QES_Text,
                    QES_Number: question.QES_Number,
                  },
                  create: {
                    QES_Text: question.QES_Text,
                    QES_Number: question.QES_Number,
                    QES_Section: section.SEC_Id,
                  },
                })),
              },
            },
            create: {
              SEC_Name: section.SEC_Name,
              SEC_Number: section.SEC_Number,
              rc_questions: {
                create: section.rc_questions.map((question: any) => ({
                  QES_Text: question.QES_Text,
                  QES_Number: question.QES_Number,
                })),
              },
            },
          })),
        },
      },
      include: {
        rc_sections: {
          include: {
            rc_questions: true,
          },
        },
      },
    });

    return NextResponse.json(updatedSelfassessment, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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

    const response = await prisma.rc_selfassessments.delete({
      where: {
        SAT_Id: fetchedId,
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
