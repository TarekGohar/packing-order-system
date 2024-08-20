"use client";

import { useFormState } from "react-dom";
import { signup } from "@/auth/actions";
import Link from "next/link";

export default function SignUpForm() {
  // TODO: Encrypt form data
  const [formState, formAction] = useFormState<any, FormData>(signup, {
    errors: {},
  });
  console.log("THIS IS " + formState);
  return (
    <form action={formAction} className="w-96">
      {formState?.errors?._form && (
        <p className=" text-xs text-red-500">{formState.errors._form}</p>
      )}
      <h1>First Name</h1>
      <input
        type="text"
        name="first_name"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          formState?.errors?.first_name ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {formState?.errors?.first_name && (
        <p className="mt-2 text-xs text-red-500">
          {formState.errors.first_name.join(", ")}
        </p>
      )}
      <h1 className="mt-4">Last Name</h1>
      <input
        type="text"
        name="last_name"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          formState?.errors?.last_name ? "border-red-500" : ""
        }`}
        placeholder="Enter your last name"
      />
      {formState?.errors?.last_name && (
        <p className="mt-2 text-xs text-red-500">
          {formState.errors.last_name.join(", ")}
        </p>
      )}
      <h1 className="mt-4">Email Address</h1>
      <input
        type="email"
        name="email"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          formState?.errors?.email ? "border-red-500" : ""
        }`}
        placeholder="Enter your email address"
      />
      {formState?.errors?.email && (
        <p className="mt-2 text-xs text-red-500">{formState.errors.email}</p>
      )}
      <h1 className="mt-4">Password</h1>
      <input
        type="password"
        name="password"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          formState?.errors?.password ? "border-red-500" : ""
        }`}
        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
      />
      {formState?.errors?.password && (
        <p className="mt-2 text-xs text-red-500">
          {formState.errors.password.join(", ")}
        </p>
      )}
      <h1 className="mt-4">Confirm Password</h1>
      <input
        type="password"
        name="conf_password"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          formState?.errors?.conf_password ? "border-red-500" : ""
        }`}
        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
      />
      {formState?.errors?.conf_password && (
        <p className="mt-2 text-xs text-red-500">
          {formState.errors.conf_password}
        </p>
      )}

      <button className="w-full h-12 bg-black text-white rounded-lg mt-8">
        Sign Up
      </button>
      <div className="mt-4 flex justify-center items-center gap-x-1">
        <span>Already have an account?</span>
        <Link href="/signin" className="font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}
