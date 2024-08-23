"use client";

import { useFormState } from "react-dom";
import DatePicker from "./DatePicker";
import { useState, Dispatch, SetStateAction } from "react";

interface FormProps {
  formState: any;
  formAction: FormData;
  state: any;
  setState: Dispatch<SetStateAction<boolean>>;
}

export default function CreateNewForm({
  formState,
  formAction,
  state,
  setState,
}: FormProps) {
  return (
    <form className="w-full mt-4">
      {(true && <p className=" text-xs text-red-500">{"Error message"}</p>) || (
        <p className=" text-xs opacity-0">{"Error message"}</p>
      )}
      <h1>Name</h1>
      <input
        type="text"
        name="name"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          true ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {true && <p className="mt-2 text-xs text-red-500">{"Error message"}</p>}
      <h1>Location</h1>
      <input
        type="text"
        name="location"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          true ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {true && <p className="mt-2 text-xs text-red-500">{"Error message"}</p>}
      <h1>Date</h1>
      <DatePicker />
      {true && <p className="mt-2 text-xs text-red-500">{"Error message"}</p>}
      <h1>Bartenders</h1>
      <input
        type="number"
        name="bartenders"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          true ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {true && <p className="mt-2 text-xs text-red-500">{"Error message"}</p>}
      <h1>Guests</h1>
      <input
        type="number"
        name="guests"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          true ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {true && <p className="mt-2 text-xs text-red-500">{"Error message"}</p>}
      <h1>Notes</h1>
      <textarea
        name="bartenders"
        className={`w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none ${
          true ? "border-red-500" : ""
        }`}
        placeholder="Enter your first name"
      />
      {true && <p className="mt-2 text-xs text-red-500">{"Error message"}</p>}

      <button className="w-full h-12 bg-green-600 text-white rounded-lg mt-8">
        Create New Order
      </button>
    </form>
  );
}
