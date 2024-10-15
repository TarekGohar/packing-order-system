"use client";

import React from "react";
import OrderButton from "@/components/OrderButton";
import { PackingLabel } from "@prisma/client";
import Link from "next/link";
import { submitData } from "@/actions";
import { useState } from "react";
import { revalidatePath } from "next/cache";

interface OrderProps {
  groupedLabels: Record<string, PackingLabel[]>;
  order: PackingOrder;
}

type PackingOrder = {
  id: string;
  name: string;
  location: string | null;
  date: Date;
  bartenders: number;
  guests: number;
  notes: string | null;
  createdAt: Date;
  lastViewedAt: Date;
  updatedAt: Date;
  completed: boolean;
  authorId: string;
  labels: PackingLabel[];
};

export default function ShowOrderDetailsPage({
  groupedLabels,
  order,
}: OrderProps) {
  const [editing, setEditing] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete this?");

    if (isConfirmed) {
      // Proceed with the delete logic here
      try {
        // Example of deletion logic, e.g., sending a request to your API
        const response = await fetch("/api/delete-item", {
          method: "DELETE",
          body: JSON.stringify({ id: "item-id" }),
        });

        if (response.ok) {
          alert("Item deleted successfully");
          // Redirect or refresh the page after deletion
        } else {
          alert("Failed to delete the item.");
        }
      } catch (error) {
        alert("An error occurred while deleting.");
      }
    }
  };

  return (
    <form name={order.id} action={submitData}>
      <input type="hidden" name="orderId" value={order.id} />
      <input type="hidden" name="orderLabelCount" value={order.labels.length} />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-2xl">Event Supplies</h2>
        <button onClick={() => setEditing(!editing)} className="p-1">
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            data-name="24x24/On Light/Edit"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 text-neutral-600 rounded-md w-7 h-7 p-[2px]"
          >
            <path
              d="M4 20.75a.751.751 0 0 1-.75-.75v-4.181a.755.755 0 0 1 .22-.53L14.711 4.05a2.72 2.72 0 0 1 3.848 0l1.391 1.391a2.72 2.72 0 0 1 0 3.848L8.712 20.53a.747.747 0 0 1-.531.22Zm.75-4.621v3.121h3.12l7.91-7.91-3.12-3.12Zm12.091-5.849 2.051-2.051a1.223 1.223 0 0 0 0-1.727l-1.393-1.394a1.222 1.222 0 0 0-1.727 0L13.72 7.16Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {Object.keys(groupedLabels).map((section) => (
          <div key={section}>
            <h3 className="font-bold text-xl mb-2">{section}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedLabels[section].map((label) => (
                <div
                  key={label.id}
                  className="group flex items-center mr-4 gap-x-3"
                >
                  <OrderButton label={label} holdTime={300} />

                  {/* Conditionally hidden delete button */}
                  {editing && (
                    <button
                      onClick={() => setDeleting(true)}
                      className="h-fit w-fit"
                    >
                      <svg
                        className=" hover:text-red-500 active:text-red-600/90 opacity-[10%] group-hover:opacity-100"
                        fill="currentColor"
                        version="1.1"
                        width={"16px"}
                        height={"16px"}
                        viewBox="0 0 41.336 41.336"
                      >
                        <g>
                          <path
                            d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2
		s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2
		S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
		s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
		s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
		c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z"
                          />
                        </g>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save/Cancel Changes */}
      <div className="my-24 flex justify-end gap-x-4">
        <Link
          type="button"
          href={`/orders/`}
          className="bg-neutral-200/50 px-4 py-3 rounded-xl font-semibold text-neutral-400 hover:bg-neutral-200/80 active:bg-neutral-200 duration-150 unselectable"
        >
          Cancel
        </Link>
        <button
          type="submit"
          className="bg-green-600 px-4 py-3 rounded-xl font-semibold text-white hover:bg-green-700/90 active:bg-green-700 duration-150 unselectable"
        >
          Save Changes
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {deleting ? (
        <div className="relative">
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Popup Title</h2>
              <p className="mb-4">
                Are you sure you would like to delete this item?
              </p>
              <form action="">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
