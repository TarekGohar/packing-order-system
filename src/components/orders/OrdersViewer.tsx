"use client";

import CheckmarkBox from "@/components/CheckmarkBox";
import Link from "next/link";
import { PackingOrder } from "@prisma/client";
import { useState } from "react";

interface OrdersProps {
  orders: (PackingOrder & {
    _count: {
      labels: number;
    };
  })[];
}

function getFullDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

export default function OrdersViewer({ orders }: OrdersProps) {
  const [sortedOrders, setOrders] = useState(orders);
  const [isAscending, setIsAscending] = useState(true);

  // const handleNameSort = () => {
  //   const sortedOrders = [...orders].sort((a, b) => {
  //     const nameA = a.name.toLowerCase();
  //     const nameB = b.name.toLowerCase();
  //     if (nameA < nameB) return isAscending ? -1 : 1;
  //     if (nameA > nameB) return isAscending ? 1 : -1;
  //     return 0;
  //   });
  //   setOrders(sortedOrders);
  //   setIsAscending(!isAscending); // Toggle the sorting order
  // };

  const handleSort = (type: keyof PackingOrder) => {
    const sortedOrders = [...orders].sort((a, b) => {
      const nameA = a[type]?.toString().toLowerCase();
      const nameB = b[type]?.toString().toLowerCase();
      if (!nameA || !nameB) return 0;
      if (nameA < nameB) return isAscending ? -1 : 1;
      if (nameA > nameB) return isAscending ? 1 : -1;
      return 0;
    });
    setOrders(sortedOrders);
    setIsAscending(!isAscending); // Toggle the sorting order
  };

  const handleSortLabels = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      return isAscending
        ? a._count.labels - b._count.labels
        : b._count.labels - a._count.labels;
    });
    setOrders(sortedOrders);
    setIsAscending(!isAscending); // Toggle the sorting order
  };

  return (
    <div className="rounded-xl overflow-x-auto border-[.175rem] border-neutral-200 bg-neutral-200">
      {/* Order Headers */}
      <div className="flex w-full items-center justify-left h-fit bg-neutral-50">
        <div className="mx-auto py-5 px-4 min-w-12">
          <CheckmarkBox name="check-all" />
        </div>

        <div className="flex flex-grow justify-between text-neutral-400 text-left gap-x-2 bg-neutral-50">
          <h2 className="fl items-center gap-x-1 px-4 py-5 w-60 hover:bg-neutral-100 duration-150">
            Order ID
          </h2>
          <h2
            onClick={handleSort.bind(null, "name")}
            className="flex items-center gap-x-1 px-4 py-5 w-60 hover:bg-neutral-100 duration-150"
          >
            Name{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              className="text-neutral-400"
            >
              <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
              <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
            </svg>
          </h2>
          <h2
            onClick={handleSort.bind(null, "location")}
            className="flex items-center gap-x-1 px-4 py-5 w-60 hover:bg-neutral-100 duration-150"
          >
            Location{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              className="text-neutral-400"
            >
              <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
              <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
            </svg>
          </h2>
          <h2 className="flex items-center gap-x-1 px-4 py-5 w-36 hover:bg-neutral-100 duration-150">
            Date{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              className="text-neutral-400"
            >
              <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
              <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
            </svg>
          </h2>
          <h2
            onClick={handleSortLabels}
            className="flex items-center gap-x-1 px-4 py-5 w-24 hover:bg-neutral-100 duration-150"
          >
            Items{" "}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              className="text-neutral-400"
            >
              <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
              <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
            </svg>
          </h2>
          <h2 className="flex items-center gap-x-1 px-4 py-5 w-40 hover:bg-neutral-100 duration-150">
            Status
          </h2>
          <h2 className="flex items-center gap-x-1 px-4 py-5 w-60 hover:bg-neutral-100 duration-150">
            Actions
          </h2>
        </div>
      </div>

      {/* Order Rows */}
      <div className="space-y-[.175rem]">
        {/* Used space-y-1 for even spacing */}
        {sortedOrders.map((order) => (
          <Link
            href={`/orders/${order.id}`}
            key={order.id}
            className="flex w-max min-w-full items-center justify-left bg-white hover:bg-neutral-50"
          >
            <div className="mx-auto py-5 px-4 min-w-12">
              <CheckmarkBox name={`check-${order.id}`} />
            </div>

            <div className="flex flex-grow font-light justify-between text-neutral-400 text-left gap-x-2">
              <h2 className="px-4 py-5 w-60 flex items-center truncate">
                #{order.id}
              </h2>
              <h2 className="font-normal text-neutral-500 w-60 px-4 py-5 flex items-center overflow-hidden whitespace-nowrap">
                {order.name}
              </h2>
              <h2 className="w-60 px-4 py-5 flex items-center overflow-hidden whitespace-nowrap">
                {order.location}
              </h2>
              <h2 className="w-36 px-4 py-5 flex items-center overflow-hidden whitespace-nowrap ">
                {getFullDate(order.createdAt)}
              </h2>
              <h2 className="w-24 px-4 py-5 flex items-center overflow-hidden whitespace-nowrap">
                {order._count.labels}
              </h2>
              <h2 className="w-40 px-4 py-5 flex items-center font-medium">
                {order.completed ? (
                  <div className="flex items-center gap-x-2 bg-green-100 border-[1px] border-green-600 py-[4px] px-[8px] w-fit rounded-xl text-green-600">
                    <div className="h-[.4rem] w-[.4rem] rounded-full bg-green-600"></div>
                    <div className="text-sm">Completed</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-x-2 bg-red-100 border-[1px] border-red-600 py-[4px] px-[8px] w-fit rounded-xl text-red-600">
                    <div className="h-[.4rem] w-[.4rem] rounded-full bg-red-600"></div>
                    <div className="text-sm">Incomplete</div>
                  </div>
                )}
              </h2>
              <h2 className="w-60 px-4 py-5 flex items-center">Actions</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
