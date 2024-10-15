"use client";

import { changeOrderNotes } from "@/actions/";
import { PackingOrder } from "@prisma/client";
import { useState } from "react";

interface OrderProps {
  order: PackingOrder;
}

export default function ShowOrderNotes({ order }: OrderProps) {
  const [editing, setEditing] = useState(true);
  const [notes, setNotes] = useState<string>(order.notes ?? "");

  return editing ? (
    <div className="flex flex-col justify-between rounded-xl bg-neutral-100/40 bg-gradient-to-r from-neutral-100/40 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-400 p-1">Notes</h1>
        <button onClick={() => setEditing(false)} className="p-1">
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            data-name="24x24/On Light/Edit"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-neutral-200 text-neutral-600 rounded-md w-7 h-7 p-[2px]"
          >
            <path
              d="M4 20.75a.751.751 0 0 1-.75-.75v-4.181a.755.755 0 0 1 .22-.53L14.711 4.05a2.72 2.72 0 0 1 3.848 0l1.391 1.391a2.72 2.72 0 0 1 0 3.848L8.712 20.53a.747.747 0 0 1-.531.22Zm.75-4.621v3.121h3.12l7.91-7.91-3.12-3.12Zm12.091-5.849 2.051-2.051a1.223 1.223 0 0 0 0-1.727l-1.393-1.394a1.222 1.222 0 0 0-1.727 0L13.72 7.16Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <p className="mt-2 p-1 w-full font-medium text-neutral-400/90">
        {order.notes ?? "No notes"}
      </p>
    </div>
  ) : (
    <form
      action={changeOrderNotes}
      className="flex flex-col justify-between rounded-xl bg-neutral-100/40 bg-gradient-to-r from-neutral-100/40 p-8"
      onSubmit={() => {
        setTimeout(() => {
          setEditing(true);
        }, 250);
      }}
    >
      <input type="hidden" name="orderId" value={order.id} />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl p-1 font-bold text-neutral-400">Notes</h1>
        <button type="submit" className="p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="270"
            height="270"
            viewBox="0 0 270 270"
            className="bg-neutral-200 text-neutral-600 rounded-md w-7 h-7 p-1"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="30"
              d="M30 180l60 60L240 30"
            ></path>
          </svg>
        </button>
      </div>

      <textarea
        name="notes"
        value={notes}
        className="rounded-lg bg-black/5 text-left mt-2 p-1 h-48 font-medium text-neutral-400/90 outline-none placeholder:font-medium placeholder:text-neutral-300"
        placeholder="Add any additional notes here"
        onChange={(e) => {
          if (e.target.value.length > 250) {
            return;
          }
          setNotes(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && "form" in e.target) {
            e.preventDefault();
            (e.target.form as HTMLFormElement).requestSubmit();
          }
        }}
      ></textarea>
    </form>
  );
}
