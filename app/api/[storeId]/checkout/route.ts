import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, DELETE",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ storeId: string }> }
) {
  const { storeId } = await params;
  const { productsOrdered } = await req.json();

  if (!productsOrdered || productsOrdered.length === 0) {
    return new NextResponse("Products are required", { status: 400 });
  }

  console.log("checkoutInfo", productsOrdered);
  const productIds = productsOrdered.map(
    (product: { id: string }) => product.id
  );
  const productQuantities = productsOrdered.map(
    (product: { quantity: number }) => product.quantity
  );

  console.log("productIds", productIds);

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product IDs are required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  products.forEach((product) => {
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
      quantity: productQuantities[productIds.indexOf(product.id)],
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          orderQuantity: productQuantities[productIds.indexOf(productId)],
          product: {
            connect: {
              id: productId,
            },
          },
        })),
      },
    },
  });

  console.log("order", order);

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });

  return NextResponse.json(
    {
      url: session.url,
    },
    { headers: corsHeaders }
  );
}
