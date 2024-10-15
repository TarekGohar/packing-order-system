"use client";

import CreateNewForm from "./CreateNewForm";

export default function CreateNewPage() {
  return (
    <div className="max-w-lg w-full">
      <div className="bg-neutral-50 rounded-xl p-8">
        <h1 className="font-semibold text-3xl">Create New Event</h1>
        <h2 className="mt-2 font-light">
          Please enter the event details to proceed.
        </h2>
        <CreateNewForm />
      </div>
    </div>
  );
}
