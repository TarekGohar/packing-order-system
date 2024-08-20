"use server";

import { getSession } from "@/auth/actions/getSession";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { createHash } from "crypto";

export async function signin(
  prevState: { error: undefined | string },
  formData: FormData
) {
  const session = await getSession();
  console.log("Session:", formData);

  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  // Check DB for user existance
  const signInUser = await db.user.findFirst({ where: { email } });

  if (!signInUser) {
    console.log("Email does not exists");
    return { error: "Invalid email or password" };
  }

  const hash = createHash("sha256");
  const hashedPassword = hash.update(password).digest("hex");

  if (hashedPassword !== signInUser.password_hash) {
    console.log("Invalid password");
    return { error: "Invalid email or password" };
  }

  session.userId = signInUser.id;
  session.email = email;
  session.isLoggedIn = true;

  await session.save();
  console.log("Logged in as", email);

  redirect("/dashboard");
}
