"use client";

import { signup } from "@/auth/actions";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function CreateNewPage() {
  const [formState, formAction] = useFormState<any, FormData>(signup, {
    errors: {},
  });
  const [state, setState] = useState(true);

  function handleSubmit() {
    setState(false);
  }

  return (
    <div>
      {state ? (
        <form action={handleSubmit}>
          <input type="text" name="name" />
        </form>
      ) : (
        <div className="">{"fruits"}</div>
      )}
    </div>
  );
}
