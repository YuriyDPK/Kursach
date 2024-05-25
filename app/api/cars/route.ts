import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const cars = await prisma.car.findMany();
    return NextResponse.json(cars);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      make,
      model,
      year,
      price,
      mileage,
      description,
      sellerId,
      brandId,
      dealerId,
    } = await req.json();
    const newCar = await prisma.car.create({
      data: {
        make,
        model,
        year,
        price,
        mileage,
        description,
        seller: { connect: { id: sellerId } },
        brand: brandId ? { connect: { id: brandId } } : undefined,
        dealer: dealerId ? { connect: { id: dealerId } } : undefined,
      },
    });
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500 }
    );
  }
}
