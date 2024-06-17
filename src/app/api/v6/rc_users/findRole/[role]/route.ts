import prisma from "@/app/lib/prisma";
import { ParameterFullName, ParameterRole } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterRole) {
  try {
    const fetchedRole = params.role;
    const response = await prisma.rc_users.findMany({
      where: {
        USR_Role: fetchedRole 
      },
    });

    if (response) return NextResponse.json(response, { status: 200 });
    return NextResponse.json({ error: "Users not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
