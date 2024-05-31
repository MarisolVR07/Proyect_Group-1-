import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const questions = await req.json();

    if (!Array.isArray(questions)) {
      return NextResponse.json(
        { error: "Invalid input, expected an array of questions" },
        { status: 400 }
      );
    }

    const createdQuestions = await prisma.$transaction(
      questions.map((question) =>
        prisma.rc_questions.create({
          data: {
            QES_Id: question.QES_Id,
            QES_Text: question.QES_Text,
            QES_Number: question.QES_Number,
            QES_Section: question.QES_Section,
          },
          // include: { rc_departments: true }
        })
      )
    );

    return NextResponse.json(createdQuestions, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create questions" },
      { status: 500 }
    );
  }
}
