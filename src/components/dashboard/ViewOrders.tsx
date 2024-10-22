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
      key={index}
      className="bg-neutral-50/40 grid grid-cols-1 font-normal text-left text-neutral-400 divide-y hover:bg-neutral-50 duration-150"
    >
      <div className="grid grid-cols-4 sm:whitespace-normal w-full py-4">
        <div className="mx-auto my-auto w-full truncate px-3 md:px-6"></div>
        <div className="mx-auto my-auto w-full truncate px-3 md:px-6"></div>
        <div className="mx-auto my-auto w-full truncate px-3 md:px-6"></div>

        <div className="px-3 md:px-6 opacity-0">
          <div className="flex items-center gap-x-2 bg-green-100 border-[1px] border-green-600 py-[4px] px-[8px] w-fit rounded-xl text-green-600">
            <div className="h-[.4rem] w-[.4rem] rounded-full bg-green-600"></div>
            <div className="text-sm">Completed</div>
          </div>
        </div>
      </div>
    </li>
  ));

  return (
    <div>
      <ul className="mt-4 rounded-lg overflow-hidden border-[0.5px]">
        <h1 className="text-2xl font-semibold px-3 md:px-6 pt-6 pb-4 text-neutral-700">
          {title}
        </h1>
        <div className="grid grid-cols-4 py-4 text-left text-neutral-500 font-semibold divide-x">
          <h2 className="px-3 md:px-6">Name</h2>
          <h2 className="px-3 md:px-6">Location</h2>
          <h2 className="px-3 md:px-6">Date</h2>
          <h2 className="px-3 md:px-6">Status</h2>
        </div>
        {paginatedOrders.map((order) => (
          <li
            key={order.id}
            className="bg-neutral-50/40 grid grid-cols-1 font-normal text-left text-neutral-400 divide-y hover:bg-neutral-50 duration-150"
          >
            <Link
              href={`/orders/${order.id}`}
              className="grid grid-cols-4 sm:whitespace-normal w-full py-4"
            >
              <div className="mx-auto my-auto w-full truncate px-3 md:px-6">
                {order.name}
              </div>
              <div className="mx-auto my-auto w-full truncate px-3 md:px-6">
                {order.location}
              </div>
              <div className="mx-auto my-auto w-full truncate px-3 md:px-6">
                {order.date.getDate()}/{order.date.getMonth() + 1}/
                {order.date.getFullYear()}
              </div>

              <div className="px-3 md:px-6 font-medium">
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
              </div>
            </Link>
          </li>
        ))}
        {emptyItems}
      </ul>
      <div className="mt-4 flex justify-center gap-x-4 items-center">
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
        <span className="w-12 text-center text-neutral-400 font-medium">
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
