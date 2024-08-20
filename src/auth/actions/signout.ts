"use server";

import { getSession } from "@/auth/actions/getSession";
import { redirect } from "next/navigation";

export async function signout() {
  const session = await getSession();
  session.destroy();
  redirect("/signin");
}
