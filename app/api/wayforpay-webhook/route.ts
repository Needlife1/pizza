import { prisma } from "@/prisma/prismaClient";
import { refundPayment } from "@/shared/lib";
import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  
    try {
      const body = await req.json();

      const order = await prisma.order.findFirst({
        where: {
          paymentId: body.orderReference,
        },
      });

      if (!order) {
        return NextResponse.json({ error: 'Order not found' });
      }

      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.SUCCEEDED,
        },
      });

      // Відміна платежу
      await refundPayment({
        orderReference: body.orderReference,
        amount: order.totalAmount,
      });
        
      return NextResponse.json({ status: 'ok' });
    } catch (error) {
            console.log('[Checkout Error]', error);
            return NextResponse.json({ error: 'Server error' })
        }
    }
