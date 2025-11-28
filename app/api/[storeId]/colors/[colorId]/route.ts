import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ colorId: string }>;
  }
) {
  try {
    const { colorId } = await params;

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ storeId: string; colorId: string }>;
  }
) {
  try {
    const { storeId, colorId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;

    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.updateMany({
      where: { id: colorId },
      data: { name, value },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ storeId: string; colorId: string }>;
  }
) {
  try {
    const { storeId, colorId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!colorId) {
      return new NextResponse("Color ID is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.deleteMany({
      where: { id: colorId },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
