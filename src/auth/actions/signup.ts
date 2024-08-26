"use server";

import { getSession } from "@/auth/actions/getSession";
import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { createHash } from "crypto";
import { User } from "@prisma/client";

const UserSchema = z
  .object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>-]).{8,}$/,
        "Password must contain at least one letter, one number, one special character, and be at least 8 characters long"
      ),
    conf_password: z.string(),
  })
  .refine((data) => data.password === data.conf_password, {
    message: "Passwords do not match",
    path: ["conf_password"],
  });

interface SignUpFormState {
  errors: {
    first_name?: string[];
    last_name?: string[];
    email?: string[];
    password?: string[];
    conf_password?: string[];
    _form?: string[];
  };
}

export async function signup(prevState: SignUpFormState, formData: FormData) {
  const session = await getSession();
  console.log("Session:", formData);

  const data = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    conf_password: formData.get("conf_password") as string,
  };

  const result = UserSchema.safeParse(data);

  // Check DB for existing user
  let user = null;
  if (data.email) {
    console.log("Checking for existing user");
    user = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });
  }

  if (!result.success || user) {
    // Access all error details
    const validationErrors = {
      errors: result.error?.flatten().fieldErrors ?? {},
    };

    // add email error if user exists
    if (user) {
      validationErrors.errors.email = ["Account with email already exists"];
    }

    return validationErrors;
  }

  const hash = createHash("sha256");
  let newUser: User;

  try {
    newUser = await db.user.create({
      data: {
        first_name: data.first_name.toLowerCase(),
        last_name: data.last_name.toLowerCase(),
        email: data.email.toLowerCase(),
        password_hash: hash.update(data.password).digest("hex"),
      },
    });
  } catch (error) {
    return {
      errors: {
        _form: ["Error creating account"],
      },
    };
  }

  session.userId = newUser.id;
  session.email = data.email;
  session.isLoggedIn = true;

  await session.save();
  console.log("Logged in as", data.email);

  redirect("/dashboard");
}
