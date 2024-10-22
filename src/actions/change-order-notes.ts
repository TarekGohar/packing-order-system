"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeOrderNotes(data: FormData) {
  const orderId = data.get("orderId");
  const notes = data.get("notes");

  await db.packingOrder.update({
    where: {
      id: orderId as string,
    },
    data: {
      notes: notes as string,
    },
  });

  revalidatePath("/orders/" + orderId);
  //   redirect("/orders/" + orderId);
}
