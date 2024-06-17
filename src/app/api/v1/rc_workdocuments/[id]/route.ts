import prisma from "@/app/lib/prisma";
import { ParameterId } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterId) {
  try {
    const fetchedId = parseInt(params.id);
    const response = await prisma.rc_workdocuments.findUnique({
      where: {
        WDC_Id : fetchedId,
      },
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json({ error: "Work Document not found" }, { status: 404 });
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
    const workdocument = await req.json();
   
    const response = await prisma.rc_workdocuments.update({
      where: {
        WDC_Id : fetchedId,
      },
      data: {
        ...workdocument,
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
    const response = await prisma.rc_workdocuments.delete({
      where: {
        WDC_Id : fetchedId,
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