import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkoutSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalAmount, orderNotes, ...customerData } = body;

    // Validate customer data
    const validationResult = checkoutSchema.safeParse(customerData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error.issues },
        { status: 400 }
      );
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    // Create order
    const order = await db.order.create({
      data: {
        orderNumber,
        customerName: validationResult.data.customerName,
        email: validationResult.data.email,
        phone: validationResult.data.phone,
        address: validationResult.data.address,
        city: validationResult.data.city,
        state: validationResult.data.state,
        zipCode: validationResult.data.zipCode,
        items: items,
        totalAmount: totalAmount,
        orderNotes: orderNotes || null,
        status: "pending",
        paymentMethod: "COD",
      },
    });

    return NextResponse.json(
      {
        id: order.id,
        orderNumber: order.orderNumber,
        message: "Order placed successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
