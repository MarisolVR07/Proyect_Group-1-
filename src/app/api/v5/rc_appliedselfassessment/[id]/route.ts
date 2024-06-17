import prisma from "@/app/lib/prisma";
import { ParameterId } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const response = await prisma.rc_appliedselfassessment.findUnique({
      where: {
        ASA_Id: fetchedId,
      },
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json(
      { error: "SelfAssessmentsxUser not found" },
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
    const appliedselfassessment = await req.json();
    console.log(appliedselfassessment);
    const response = await prisma.rc_appliedselfassessment.update({
      where: {
        ASA_Id: fetchedId,
      },
      data: {
        ...appliedselfassessment,
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

export async function DELETE(_req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
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
