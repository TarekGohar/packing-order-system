"use server";

import { getSession } from "@/auth/actions/getSession";
import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/db";

const UserSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
      "Password must contain at least one letter, one number, one special character, and be at least 8 characters long"
    ),
});

interface SignUpFormState {
  errors: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    password?: boolean;
    _form?: string[];
  };
}

export async function signup(prevState: SignUpFormState, formData: FormData) {
  const session = await getSession();
  console.log("Session:", formData);

  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const conf_password = formData.get("conf_password") as string;

  if (password !== conf_password) {
    console.log("Passwords do not match");
    console.log("Password: ", password);
    console.log("Confirm Password: ", conf_password);
    return { passworderror: "Passwords do not match" };
  }

  const result = UserSchema.safeParse({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!result.success) {
    // Access all error details
    return { errors: result.error.flatten().fieldErrors };
  } else {
    console.log("Password is valid!");
  }

  //   // CHECK USER IN DB
  //   // const user = await db.getUser({username,password})

  //   const user = await db.user.findFirst({
  //     where: {
  //       email,
  //     },
  //   });

  //   if (!user) {
  //     console.log("Invalid username");
  //     return { error: "Invalid username" };
  //   }

  //   await session.save();
  //   console.log("Logged in as", email);

  //   redirect("/dashboard");
}
