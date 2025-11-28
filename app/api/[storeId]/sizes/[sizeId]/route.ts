import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ sizeId: string }>;
  }
) {
  try {
    const { sizeId } = await params;
    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZES_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ storeId: string; sizeId: string }>;
  }
) {
  try {
    const { storeId, sizeId } = await params;
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
    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const size = await prismadb.size.updateMany({
      where: { id: sizeId },
      data: { name, value },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ storeId: string; sizeId: string }>;
  }
) {
  try {
    const { storeId, sizeId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!sizeId) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const size = await prismadb.size.deleteMany({
      where: { id: sizeId },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("SIZE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
