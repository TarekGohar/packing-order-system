"use server";

import { getSession } from "@/actions";
import { redirect } from "next/navigation";
import { db } from "@/db";

const TEST_USERNAME = "test";
const TEST_ISPRO = false;

export async function login(
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
    console.log("Form username:", email);
    console.log("Test username:", TEST_USERNAME);
    console.log("Test password: ", password);
    return { error: "Invalid username" };
  }

  session.userId = "1";
  session.username = email;
  session.isPro = TEST_ISPRO;
  session.isLoggedIn = true;

  await session.save();
  console.log("Logged in as", email);

  redirect("/dashboard");
}
