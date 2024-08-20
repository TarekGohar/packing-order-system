"use server";

import { getSession } from "@/auth/actions/getSession";
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function signin(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const session = await getSession();
  console.log("Session:", formData);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // CHECK USER IN DB
  // const user = await db.getUser({username,password})

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    console.log("Invalid username");
    return { error: "Invalid username" };
  }

  session.userId = "1";
  session.username = email;
  session.isLoggedIn = true;

  await session.save();
  console.log("Logged in as", email);

  redirect("/dashboard");
}
