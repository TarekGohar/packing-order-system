"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PackingOrder } from "@prisma/client";
import Image from "next/image";

interface RecentlyViewedProps {
  title: string;
  orders: PackingOrder[];
}

export default function ViewOrders({ title, orders }: RecentlyViewedProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleClickNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const emptyItemsCount = itemsPerPage - paginatedOrders.length;
  const emptyItems = Array.from({ length: emptyItemsCount }, (_, index) => (
    <li
      key={`empty-${index}`}
      className="bg-neutral-50/40 grid grid-cols-1 font-medium text-center text-xs text-neutral-500 divide-y hover:bg-neutral-50 duration-150"
    >
      <div className="grid grid-cols-4 truncate sm:whitespace-normal w-full py-3 opacity-0">
        <div className="mx-auto my-auto">&nbsp;D</div>
        <div className="mx-auto my-auto">&nbsp;D</div>
        <div className="mx-auto my-auto">&nbsp;D</div>
        <div className="mx-auto bg-green-500 py-[6px] px-[8px] rounded-2xl text-green-100">
          Completed
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <h1 className="text-2xl font-medium">{title}</h1>
      <ul className="mt-4 divide-y rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 py-3 text-center text-sm text-white font-semibold bg-neutral-300 divide-x">
          <h2>Name</h2>
          <h2>Location</h2>
          <h2>Date</h2>
          <h2>Status</h2>
        </div>
        {paginatedOrders.map((order) => (
          <li
            key={order.id}
            className="bg-neutral-50/40 grid grid-cols-1 font-medium text-center text-xs text-neutral-500 divide-y hover:bg-neutral-50 duration-150"
          >
            <Link
              href={`/orders/${order.id}`}
              className="grid grid-cols-4 truncate sm:whitespace-normal w-full py-3"
            >
              <div className="mx-auto my-auto">{order.name}</div>
              <div className="mx-auto my-auto">{order.location}</div>
              <div className="mx-auto my-auto">
                {order.date.getDate()}/{order.date.getMonth() + 1}/
                {order.date.getFullYear()}
              </div>

              {order.completed ? (
                <div className="mx-auto bg-green-500 py-[6px] px-[8px] rounded-2xl text-green-100">
                  Completed
                </div>
              ) : (
                <div className="mx-auto bg-red-500/80 py-[6px] px-[8px] rounded-2xl text-red-100">
                  Incomplete
                </div>
              )}
            </Link>
          </li>
        ))}
        {emptyItems}
      </ul>
      <div className="mt-2 flex justify-center gap-x-4 items-center">
        <button
          onClick={handleClickPrev}
          disabled={currentPage === 1}
          className="px-4 py-2 disabled:opacity-50"
        >
          <Image
            src="/images/arrow-left.svg"
            alt="previous"
            width={10}
            height={10}
          />
        </button>
        <span className="w-12 text-center text-neutral-600 font-medium">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleClickNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 disabled:opacity-50"
        >
          <Image
            src="/images/arrow-right.svg"
            alt="next"
            width={10}
            height={10}
          />
        </button>
      </div>
    </div>
  );
}
