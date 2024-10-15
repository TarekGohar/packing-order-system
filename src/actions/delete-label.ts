"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteLabel(data: FormData) {
  console.log("data", data);

  let order = data.get("orderId");
  let label = data.get("labelId");
  console.log("orderId", order);
  console.log("labelId", label);

  const result = await db.packingLabel.delete({
    where: {
      id: label as string,
    },
  });

  console.log("Deleted label", result);
  revalidatePath(`/orders/${order}?edit=`);
  redirect(`/orders/${order}?edit=`);
}
