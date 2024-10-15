"use client";

import React from "react";
import OrderButton from "@/components/OrderButton";
import { PackingLabel } from "@prisma/client";
import Link from "next/link";
import { addOrderItem, deleteLabel, submitData } from "@/actions";
import { useState, useEffect } from "react";
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
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [labelId, setLabelId] = useState("");
  const [value, setValue] = useState("");

  const handleDelete = async () => {};

  const submitForm = () => {
    console.log("Form submitted");
    // Add your form submission logic here (e.g., POST request)
  };

  // No scroll
  useEffect(() => {
    if (adding || deleting) {
      // Disable scrolling by setting overflow hidden
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling by resetting overflow
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset scrolling when component unmounts or popup closes
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [adding, deleting]);

  return (
    <>
      <form name={order.id} action={submitData}>
        <input type="hidden" name="orderId" value={order.id} />
        <input
          type="hidden"
          name="orderLabelCount"
          value={order.labels.length}
        />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-2xl">Event Supplies</h2>
          <div className="flex gap-x-2">
            {/* Add Button */}
            <button
              type="reset"
              onClick={() => setAdding(!adding)}
              className="bg-green-500 hover:bg-green-600/80 active:bg-green-700 rounded-md w-7 h-7 p-[2px] duration-150"
            >
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 45.402 45.402"
                className=" text-neutral-100 w-full h-full p-1"
              >
                <g>
                  <path
                    fill="currentColor"
                    d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                  />
                </g>
              </svg>
            </button>

            {/* Edit Button */}
            <button
              type="reset"
              onClick={() => setEditing(!editing)}
              className="bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 rounded-md w-7 h-7 p-[2px] duration-150"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                data-name="24x24/On Light/Edit"
                className=" text-neutral-600"
              >
                <path
                  d="M4 20.75a.751.751 0 0 1-.75-.75v-4.181a.755.755 0 0 1 .22-.53L14.711 4.05a2.72 2.72 0 0 1 3.848 0l1.391 1.391a2.72 2.72 0 0 1 0 3.848L8.712 20.53a.747.747 0 0 1-.531.22Zm.75-4.621v3.121h3.12l7.91-7.91-3.12-3.12Zm12.091-5.849 2.051-2.051a1.223 1.223 0 0 0 0-1.727l-1.393-1.394a1.222 1.222 0 0 0-1.727 0L13.72 7.16Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {Object.keys(groupedLabels).map((section) => (
            <div key={section}>
              <h3 className="font-bold text-xl mb-2">{section}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedLabels[section].map((label) => (
                  <div
                    key={label.id}
                    className={`group flex items-center gap-x-3 ${
                      editing ? "mr-3" : ""
                    }`}
                  >
                    <OrderButton label={label} holdTime={300} />

                    {/* Conditionally hidden delete button */}
                    {editing && (
                      <button
                        type="reset"
                        className="h-fit w-fit"
                        onClick={() => {
                          setDeleting(true);
                          setLabelId(label.id);
                        }}
                      >
                        <svg
                          className="fill-neutral-200 hover:fill-red-500 active:text-red-600/90 duration-150"
                          fill="FFFFFF"
                          version="1.1"
                          width={"16px"}
                          height={"16px"}
                          viewBox="0 0 41.336 41.336"
                        >
                          <g>
                            <path d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z" />
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
          <button
            type="reset"
            onClick={() => {
              setEditing(true);
              setEditing(false);
            }}
            className="bg-neutral-200/50 px-4 py-3 rounded-xl font-semibold text-neutral-400 hover:bg-neutral-200/80 active:bg-neutral-200 duration-150 unselectable"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 px-4 py-3 rounded-xl font-semibold text-white hover:bg-green-700/90 active:bg-green-700 duration-150 unselectable"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Delete Confirmation Popup */}
      {deleting ? (
        <div className="relative">
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="flex flex-col justify-center items-center bg-white p-8 rounded-xl w-[350px]">
              <svg
                className="fill-red-500 bg-red-200 p-2 rounded-xl"
                fill="FFFFFF"
                version="1.1"
                width={"50px"}
                height={"50px"}
                viewBox="0 0 41.336 41.336"
              >
                <g>
                  <path d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z" />
                </g>
              </svg>
              <p className="mt-4 mb-4 font-medium text-neutral-800">
                Are you sure you would like to delete this item?
              </p>
              <form action={deleteLabel} onSubmit={() => setDeleting(false)}>
                <input type="hidden" name="orderId" value={order.id} />
                <input type="hidden" name="labelId" value={labelId} />
                <div className="w-full gap-x-2 flex items-end justify-end">
                  <button
                    type="reset"
                    onClick={() => {
                      setDeleting(false);
                    }}
                    className="w-full font-medium bg-neutral-300 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full font-medium bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {/* Adding Popup */}
      {adding ? (
        <div className="relative overflow-scroll">
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-40 z-40"></div>

          {/* Popup */}
          <div className="fixed inset-0 flex items-center justify-center z-50 mx-2">
            <div
              className="relative flex flex-col justify-center items-center bg-white p-8 rounded-xl max-w-lg w-full overflow-y-auto"
              style={{
                maxHeight: "80vh", // Limit the height to 80% of the viewport
                height: "auto", // Automatically shrink if content is smaller
              }}
            >
              <h2 className="w-full font-bold text-xl">Add Item</h2>
              <p className="w-full my-2 font-medium text-neutral-800">
                Fill in the details to add a new item.
              </p>
              <form
                action={addOrderItem}
                onSubmit={() => setDeleting(false)}
                className="w-full"
              >
                <input type="hidden" name="orderId" value={order.id} />
                <h1 className="mt-4">
                  Item Name <span className="text-red-500">*</span>
                </h1>
                <input
                  type="text"
                  name="name"
                  className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none focus:border-blue-400"
                  placeholder="Enter the item name"
                />
                <h1 className="mt-4">
                  Quantity <span className="text-red-500">*</span>
                </h1>
                <input
                  type="text" // Change to "text" for stricter control
                  name="quantity"
                  value={value}
                  inputMode="numeric" // Ensures numeric keyboard on mobile devices
                  pattern="[0-9]*" // Enforces numeric input only on HTML level
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Only allow digits
                    if (/^\d*$/.test(newValue) || newValue === "") {
                      setValue(newValue); // Update value only if it's valid
                    }
                  }}
                  className="form-btn focus:border-blue-400"
                  placeholder="Enter the quantity of item required"
                />
                <h1 className="mt-4">Category</h1>
                <input
                  type="text"
                  name="category"
                  className="w-full mt-2 py-2 px-2 border-2 rounded-lg font-light outline-none focus:border-blue-400"
                  placeholder="Enter the category name (default miscellaneous)"
                />
                <h1 className="mt-4">Comment</h1>
                <input
                  type="text"
                  name="comment"
                  className="w-full my-2 py-2 px-2 border-2 rounded-lg font-light outline-none focus:border-blue-400"
                  placeholder="Enter the category name"
                />
                <div className="mt-4 w-full gap-x-2 flex items-end justify-end">
                  <button
                    type="reset"
                    onClick={() => {
                      setAdding(false);
                    }}
                    className="w-full font-medium bg-neutral-300 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full font-medium bg-green-500 hover:bg-green-600/80 active:bg-green-700 text-white px-4 py-2 rounded-lg duration-150"
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
