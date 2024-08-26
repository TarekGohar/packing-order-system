"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import { getSession } from "@/auth/actions";
import { PackingOrder } from "@prisma/client";
import Error from "next/error";

interface CreateFormState {
  errors: {
    name?: string[];
    location?: string[];
    date?: string[];
    bartenders?: number[];
    guests?: number[];
    notes?: string[];
    _form?: string[];
  };
}

const NewFormSchema = z.object({
  name: z.string().min(2).max(50),
  location: z.string().max(50).nullable(),
  date: z.string().refine((date) => {
    const [day, month, year] = date.split("/").map(Number);

    // Basic validation for days, months, and years
    const isValidDay = day > 0 && day <= 31;
    const isValidMonth = month > 0 && month <= 12;
    const isValidYear = year > 2000;

    // Additional validation for days in each month
    const daysInMonth = new Date(year, month, 0).getDate();

    return isValidDay && isValidMonth && day <= daysInMonth && isValidYear;
  }, "Invalid date. Please check day, month, and year."),
  bartenders: z.number().nullable(),
  guests: z.number().nullable(),
  notes: z.string().nullable(),
});

export async function createNew(
  prevState: CreateFormState,
  formData: FormData
) {
  const data = {
    name: formData.get("name") as string,
    location: formData.get("location") as string,
    date: formData.get("date") as string,
    bartenders: parseInt(
      formData.get("bartenders")?.toString() || "0",
      10
    ) as number,
    guests: parseInt(formData.get("guests")?.toString() || "0", 10) as number,
    notes: formData.get("notes") as string,
  };

  const result = NewFormSchema.safeParse(data);

  if (!result.success) {
    // Access all error details
    const validationErrors = {
      errors: result.error?.flatten().fieldErrors ?? {},
    };
    return validationErrors;
  }

  let order: PackingOrder;
  const session = await getSession();

  try {
    const [day, month, year] = data.date.split("/").map(Number);
    const orderDate = new Date(year, month - 1, day);

    order = await db.packingOrder.create({
      data: {
        name: data.name,
        location: data.location || null,
        date: orderDate,
        bartenders: data.bartenders || 0,
        guests: data.guests || 0,
        notes: data.notes || null,
        lastViewedAt: new Date(),
        authorId: session.userId ?? "",
      },
    });
  } catch (error) {
    return { errors: { _form: ["Failed to create order"] } };
  }

  console.log("Created order", order);
  redirect(`/orders/${order.id}?edit`);
}
