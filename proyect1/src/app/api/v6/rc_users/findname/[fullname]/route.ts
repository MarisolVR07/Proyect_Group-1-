import prisma from "@/app/lib/prisma";
import { ParameterFullName } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterFullName) {
  try {
    const fetchedName = params.fullname;
    const response = await prisma.rc_users.findMany({
      where: {
        USR_FullName: { contains: fetchedName },
      },
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
