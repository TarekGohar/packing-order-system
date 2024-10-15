"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeOrderDetails(data: FormData) {
  const orderId = data.get("orderId");
  const name = data.get("order-name");
  const location = data.get("order-location");
  console.log("orderId", orderId);

  await db.packingOrder.update({
    where: {
      id: orderId as string,
    },
    data: {
      name: name as string,
      location: location as string,
    },
  });

  revalidatePath("/orders/" + orderId);
  // redirect("/orders/" + orderId);
}
