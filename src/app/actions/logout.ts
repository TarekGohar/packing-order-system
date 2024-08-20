"use server";

import { getSession } from "@/actions";
import { redirect } from "next/navigation";

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
}
