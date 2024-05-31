import { ParameterId } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";
import XLSXPopulate from "xlsx-populate";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const assessment = await prisma.rc_appliedselfassessment.findUnique({
      where: {
        ASA_Id: fetchedId,
      },
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
            rc_questions: true,
          },
        },
      },
    });

    if (!assessment) {
      return NextResponse.json(
        { error: "Autoevaluación no encontrada" },
        { status: 404 }
      );
    }

    const workbook = await XLSXPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    const headers = [
      "Autoevaluación ID",
      "Fecha",
      "Revisado Por",
      "Hecho Por",
      "Departamento",
      "Estado",
      "Pregunta",
      "Selección",
      "Observaciones",
      "Documento de Trabajo",
      "Acción Propuesta",
    ];

    headers.forEach((header, index) => {
      sheet.cell(1, index + 1).value(header);
    });

    assessment.rc_answers.forEach((answer, answerIndex) => {
      const row = answerIndex + 2;
      sheet.cell(row, 1).value(assessment.ASA_Id);
      sheet
        .cell(row, 2)
        .value(new Date(assessment.ASA_Date).toLocaleDateString());
      sheet.cell(row, 3).value(assessment.ASA_ReviewedBy);
      sheet.cell(row, 4).value(assessment.ASA_MadeBy);
      sheet.cell(row, 5).value(assessment.rc_departments?.DPT_Name || "");
      sheet.cell(row, 6).value(assessment.ASA_Status);
      sheet.cell(row, 7).value(answer.rc_questions?.QES_Text || "");
      sheet.cell(row, 8).value(answer.ANS_Selection);
      sheet.cell(row, 9).value(answer.ANS_Observations || "");
      sheet.cell(row, 10).value(answer.ANS_WorkDocument || "");
      sheet
        .cell(row, 11)
        .value(
          answer.rc_proposedaction
            .map((action) => action.PAC_Justification)
            .join(", ") || ""
        );
    });

    const buffer = await workbook.outputAsync();
    const response = new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="SelfAssessment.xlsx"',
      },
    });
    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al exportar los datos" },
      { status: 500 }
    );
  }
}
