"use client";

import DatePicker from "./DatePicker";
import { useFormState } from "react-dom";
import { createNew } from "@/actions";

export default function CreateNewForm() {
  const [formState, formAction] = useFormState<any, FormData>(createNew, {
    errors: {},
  });
  return (
    <form action={formAction} className="w-full mt-4">
      {!!formState.errors._form ? (
        <p className=" text-xs text-red-500">{formState.errors._form}</p>
      ) : (
        <p className=" text-xs opacity-0"> </p>
      )}

      <h1>Name</h1>
      <input
        type="text"
        name="name"
        className={`form-btn ${
          !!formState.errors.name ? "border-red-500" : "focus:border-blue-500"
        }`}
        placeholder="Enter your first name"
      />
      {!!formState.errors.name ? (
        <p className="my-1 text-xs text-red-500">{formState.errors.name}</p>
      ) : (
        <p className="my-1 text-xs opacity-0">Error Message</p>
      )}

      <h1>Location</h1>
      <input
        type="text"
        name="location"
        className={`form-btn ${
          !!formState.errors.location
            ? "border-red-500"
            : "focus:border-blue-500"
        }`}
        placeholder="Enter your first name"
      />
      {!!formState.errors.location ? (
        <p className="my-1 text-xs text-red-500">{formState.errors.location}</p>
      ) : (
        <p className="my-1 text-xs opacity-0">Error Message</p>
      )}

      <h1>Date</h1>
      <DatePicker error={!!formState.errors.date} />
      {!!formState.errors.date ? (
        <p className="my-1 text-xs text-red-500">{formState.errors.date}</p>
      ) : (
        <p className="my-1 text-xs opacity-0">Error Message</p>
      )}

      <h1>Bartenders</h1>
      <input
        type="number"
        name="bartenders"
        min="0"
        step="1"
        inputMode="numeric"
        className={`form-btn ${
          !!formState.errors.bartenders
            ? "border-red-500"
            : "focus:border-blue-500"
        }`}
        placeholder="Enter your first name"
      />
      {!!formState.errors.bartenders ? (
        <p className="my-1 text-xs text-red-500">
          {formState.errors.bartenders}
        </p>
      ) : (
        <p className="my-1 text-xs opacity-0">Error Message</p>
      )}

      <h1>Guests</h1>
      <input
        type="number"
        name="guests"
        min="0"
        step="1"
        inputMode="numeric"
        className={`form-btn ${
          !!formState.errors.guests ? "border-red-500" : "focus:border-blue-500"
        }`}
        placeholder="Enter number of guests"
      />
      {!!formState.errors.guests ? (
        <p className="my-1 text-xs text-red-500">{formState.errors.guests}</p>
      ) : (
        <p className="my-1 text-xs opacity-0">Error Message</p>
      )}

      <h1>Notes</h1>
      <textarea
        name="notes"
        className={`form-btn ${
          !!formState.errors.notes ? "border-red-500" : "focus:border-blue-500"
        }`}
        placeholder="Add any additional notes here"
      />
      {!!formState.errors.notes ? (
        <p className="my-1 text-xs text-red-500">{formState.errors.notes}</p>
      ) : (
        <p className="my-1 text-xs opacity-0">Error Message</p>
      )}

      <button className="w-full h-12 bg-green-600 text-white rounded-lg mt-6">
        Create
      </button>
    </form>
  );
}
