"use server";

import { getSession } from "@/auth/actions/getSession";
import { redirect } from "next/navigation";

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/signin");
}
