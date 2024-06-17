import prisma from "@/app/lib/prisma";
import { ParameterId } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const response = await prisma.rc_unit.findUnique({
      where: {
        UND_Id: fetchedId,
      },
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json({ error: "Unit not found" }, { status: 404 });
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
    const unit = await req.json();
    console.log(unit);
    const response = await prisma.rc_unit.update({
      where: {
        UND_Id: fetchedId,
      },
      data: {
        ...unit,
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
    const response = await prisma.rc_unit.delete({
      where: {
        UND_Id: fetchedId,
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
