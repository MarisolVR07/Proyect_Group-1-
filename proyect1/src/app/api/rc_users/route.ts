import prisma from "@/app/lib/prisma";
import { ErrorResponse } from "@/app/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const users = await prisma.rc_users.findMany({
    //  include: {rc_departments: true}
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  res: NextResponse<String | ErrorResponse | null>
) {
  try { 
    const user = await req.json();
    const users = await prisma.rc_users.create({
      data: {
        ...user,
      },
     // include: {rc_departments: true}, Para guardar departamento junto al usuario
    });
    return NextResponse.json(users, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}