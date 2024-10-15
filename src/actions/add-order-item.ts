"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addOrderItem(data: FormData) {
  console.log("data", data);
  const orderId = data.get("orderId");
  const name = data.get("name");
  const quantity = data.get("quantity");
  const category = data.get("category");
  const comment = data.get("comment");

  try {
    await db.packingLabel.create({
      data: {
        key: name as string,
        value: quantity as string,
        section: (category as string) || null,
        comment: (comment as string) || null,
        completed: false,
        packingOrder: {
          connect: {
            id: orderId as string,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error adding order item:", error);
    throw new Error("Failed to add order item");
  }

  revalidatePath(`/orders/${orderId}?edit=`);
  redirect(`/orders/${orderId}?edit=`);
}
