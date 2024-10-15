"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { getSession } from "@/auth/actions";
import { PackingOrder } from "@prisma/client";
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

  //   if (!result.success) {
  //     // Access all error details
  //     const validationErrors = {
  //       errors: result.error?.flatten().fieldErrors ?? {},
  //     };
  //     return validationErrors;
  //   }

  //   let order: PackingOrder;
  //   const session = await getSession();

  //   try {
  //     const [day, month, year] = data.date.split("/").map(Number);
  //     const orderDate = new Date(year, month - 1, day);

  //     order = await db.packingOrder.create({
  //       data: {
  //         name: data.name,
  //         location: data.location || null,
  //         date: orderDate,
  //         bartenders: data.bartenders || 0,
  //         guests: data.guests || 0,
  //         notes: data.notes || null,
  //         lastViewedAt: new Date(),
  //         authorId: session.userId ?? "",
  //       },
  //     });
  //   } catch (error) {
  //     return { errors: { _form: ["Failed to create order"] } };
  //   }

  //   console.log("Created order", order);
  //   redirect(`/orders/${order.id}?edit=`);
}
