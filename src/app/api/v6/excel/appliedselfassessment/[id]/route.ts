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
        rc_departments: {
          include: {
            rc_unit: true,
          },
        },
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

    const parameters = await prisma.rc_parameters.findUnique({
      where: {
        PRM_Id: 1,
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
    const borderStyle = {
      style: "thin",
      color: "black",
    };
    const institutionName = parameters?.PRM_Institution || "";
    const unitName = assessment.rc_departments?.rc_unit?.UND_Name || "";
    const departmentName = assessment.rc_departments?.DPT_Name || "";
    const auditName = assessment.rc_selfassessments?.SAT_Audit || "";
    const description = assessment.rc_selfassessments?.SAT_Description || "";

    sheet
      .cell("B1")
      .value(institutionName)
      .style({ bold: true, horizontalAlignment: "center", fontSize: 20 });
    sheet.range("B1:G1").merged(true);

    sheet
      .cell("B2")
      .value(unitName)
      .style({ bold: true, horizontalAlignment: "center", fontSize: 16 });
    sheet.range("B2:G2").merged(true);

    sheet
      .cell("B3")
      .value(`Department: ${departmentName}`)
      .style({ bold: true, horizontalAlignment: "center", fontSize: 14 });
    sheet.range("B3:G3").merged(true);

    sheet
      .cell("B4")
      .value(`Audit: ${auditName}, on: ${description}`)
      .style({ bold: true, horizontalAlignment: "center" });
    sheet.range("B4:G4").merged(true);

    sheet
      .cell("B5")
      .value("EVALUATION OF INTERNAL CONTROL")
      .style({ bold: true, horizontalAlignment: "center" });
    sheet.range("B5:G5").merged(true);

    let currentRow = 7;

    const columnHeaders = [
      "N.",
      "Questionnaire",
      "Yes",
      "No",
      "Reference Work Papers",
      "Observations",
    ];

    columnHeaders.forEach((header, index) => {
      sheet
        .cell(currentRow, index + 2)
        .value(header)
        .style({
          wrapText: true,
          bold: true,
          fill: "4b5563",
          fontColor: "FFFFFF",
          border: borderStyle,
          fontSize: 14,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });
    });
    currentRow++;

    assessment.rc_selfassessments?.rc_sections.forEach((section) => {
      sheet
        .cell(currentRow, 2)
        .value(`${section.SEC_Number || ""}. ${section.SEC_Name || ""}`)
        .style({
          bold: true,
          fill: "693CA5",
          fontColor: "FFFFFF",
          border: borderStyle,
          fontSize: 14,
        });
      sheet.cell(currentRow, 7).style({
        border: borderStyle,
      });
      sheet.range(currentRow, 2, currentRow, 7).merged(true);
      currentRow++;
      section.rc_questions.forEach((question, questionIndex) => {
        const row = currentRow + questionIndex;
        const answer = assessment.rc_answers.find(
          (a) => a.rc_questions?.QES_Id === question.QES_Id
        );

        sheet
          .cell(row, 2)
          .value(`${section.SEC_Number || ""}.${questionIndex + 1}`)
          .style({
            fontColor: "1f2937",
            border: borderStyle,
            horizontalAlignment: "center",
            verticalAlignment: "center",
          });
        sheet
          .cell(row, 3)
          .value(question.QES_Text || "")
          .style({
            wrapText: true,
            fontColor: "1f2937",
            border: borderStyle,
            verticalAlignment: "top",
          });
        sheet
          .cell(row, 4)
          .value(answer?.ANS_Selection === "y" ? "X" : "")
          .style({
            horizontalAlignment: "center",
            verticalAlignment: "center",
            fontColor: "1f2937",
            border: borderStyle,
            fontSize: 14,
          });
        sheet
          .cell(row, 5)
          .value(answer?.ANS_Selection === "n" ? "X" : "")
          .style({
            horizontalAlignment: "center",
            verticalAlignment: "center",
            fontColor: "1f2937",
            border: borderStyle,
            fontSize: 14,
          });
        sheet
          .cell(row, 6)
          .value(answer?.ANS_WorkDocument || "")
          .hyperlink({ href: `${answer?.ANS_WorkDocument || ""}` })
          .style({
            fontColor: "1f2937",
            border: borderStyle,
            verticalAlignment: "top",
          });
        sheet
          .cell(row, 7)
          .value(answer?.ANS_Observations || "")
          .style({
            wrapText: true,
            fontColor: "1f2937",
            border: borderStyle,
            verticalAlignment: "top",
          });
      });
      currentRow += section.rc_questions.length;
    });

    const footerStartRow = currentRow + 1;
    sheet
      .range(`B${footerStartRow}:G${footerStartRow}`)
      .merged(true)
      .value(`Carried Out By: ${assessment.ASA_MadeBy || ""}`)
      .style({ bold: true });
    sheet
      .range(`B${footerStartRow + 1}:G${footerStartRow + 1}`)
      .merged(true)
      .value(`Reviewed By: ${assessment.ASA_ReviewedBy || ""}`)
      .style({ bold: true });
    sheet
      .range(`B${footerStartRow + 2}:G${footerStartRow + 2}`)
      .merged(true)
      .value(
        `Date Applied: ${new Date(assessment.ASA_Date).toLocaleDateString()}`
      )
      .style({ bold: true });

    sheet.column(2).width(5);
    sheet.column(3).width(60);
    sheet.column(4).width(5);
    sheet.column(5).width(5);
    sheet.column(6).width(25);
    sheet.column(7).width(30);

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
