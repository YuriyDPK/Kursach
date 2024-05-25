import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const dealers = await prisma.dealer.findMany();
    return NextResponse.json(dealers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dealers" },
      { status: 500 }
    );
  }
}
