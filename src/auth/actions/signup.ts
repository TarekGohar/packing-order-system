"use server";

import { getSession } from "@/auth/actions/getSession";
import { z } from "zod";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { createHash } from "crypto";

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

  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;
  const conf_password = formData.get("conf_password") as string;

  const result = UserSchema.safeParse({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    conf_password: formData.get("conf_password") as string,
  });

  // Check DB for existing user
  let user = null;
  if (email) {
    console.log("Checking for existing user");
    user = await db.user.findFirst({
      where: {
        email,
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

  try {
    await db.user.create({
      data: {
        first_name: first_name.toLowerCase(),
        last_name: last_name.toLowerCase(),
        email: email.toLowerCase(),
        password_hash: hash.update(password).digest("hex"),
      },
    });
  } catch (error) {
    return {
      errors: {
        _form: ["Error creating account"],
      },
    };
  }

  const newUser = await db.user.findFirst({
    where: {
      email, // Replace with the email you're searching for
    },
    select: {
      id: true, // Only selecting the user's ID
    },
  });

  session.userId = newUser!.id;
  session.email = email;
  session.isLoggedIn = true;

  await session.save();
  console.log("Logged in as", email);

  redirect("/dashboard");
}
