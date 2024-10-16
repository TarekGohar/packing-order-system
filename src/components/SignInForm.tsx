"use client";

import { signin } from "@/auth/actions";
import { useFormState } from "react-dom";
import Link from "next/link";
import { relative } from "path";

export default function SignInForm() {
  const [state, formAction] = useFormState<any, FormData>(signin, {
    errors: {},
  });

  return (
    <form action={formAction}>
      <h1>Email Address</h1>
      <input
        type="email"
        name="email"
        className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none focus:border-blue-400"
        placeholder="Enter your email address"
      />
      <h1 className="mt-4">Password</h1>
      <input
        type="password"
        name="password"
        className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none focus:border-blue-400"
        placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
      />
      {state?.error && (
        <p className="mt-2 text-xs text-red-500">{state.error}</p>
      )}
      <button className="w-full h-12 bg-black text-white rounded-lg mt-8">
        Sign In
      </button>
      <div className="mt-4 flex justify-center items-center gap-x-1">
        <span>Don&apos;t have an account yet?</span>
        <Link href="/signup" className="font-medium">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
