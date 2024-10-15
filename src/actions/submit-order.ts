"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitData(data: FormData) {
  const orderId = data.get("orderId");
  const labelsCount = parseInt(data.get("orderLabelCount") as string, 10);
  var labelsComplete = 0;

  data.forEach(async (value, key) => {
    const [id, attribute] = key.split("_");
    if (attribute === undefined) return;

    try {
      const updated = await db.packingLabel.update({
        where: {
          id,
        },
        data: {
          [attribute]: value.toString(),
        },
      });

      if (updated.currentValue === updated.value) {
        attribute === "currentValue" ? labelsComplete++ : null;
        await db.packingLabel.update({
          where: {
            id,
          },
          data: {
            completed: true,
          },
        });
      } else {
        await db.packingLabel.update({
          where: {
            id,
          },
          data: {
            completed: false,
          },
        });
      }
    } catch (error) {
      console.error("Failed to update label", id, attribute, value);
    } finally {
      if (labelsComplete === labelsCount) {
        await db.packingOrder.update({
          where: {
            id: orderId as string,
          },
          data: {
            completed: true,
          },
        });
      } else {
        await db.packingOrder.update({
          where: {
            id: orderId as string,
          },
          data: {
            completed: false,
          },
        });
      }
    }
  });
  redirect("/orders/" + orderId);
}
