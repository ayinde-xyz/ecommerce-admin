import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ categoryId: string }>;
  }
) {
  try {
    const { categoryId } = await params;
    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: { id: categoryId },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_GET", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ storeId: string; categoryId: string }>;
  }
) {
  try {
    const { storeId, categoryId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;

    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const category = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_PATCH", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ storeId: string; categoryId: string }>;
  }
) {
  try {
    const { categoryId, storeId } = await params;
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const userId = session?.user.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
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

    const category = await prismadb.category.deleteMany({
      where: { id: categoryId },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
