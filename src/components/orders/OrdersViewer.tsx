"use client";

import CheckmarkBox from "@/components/CheckmarkBox";
import Link from "next/link";
import { PackingOrder } from "@prisma/client";
import { useEffect, useState } from "react";

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
  const [searching, setSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedOrders, setOrders] = useState(orders);
  const [view, setView] = useState(0); // 0 for all, 1 for incomplete, 2 for completed
  const [isAscending, setIsAscending] = useState(true);

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

  const handleDateSort = () => {
    const sortedOrders = [...orders].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isAscending
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
    setOrders(sortedOrders);
    setIsAscending(!isAscending);
  };

  // filter based on complete or not
  useEffect(() => {
    if (view === 0) {
      setOrders(orders);
    } else if (view === 1) {
      setOrders(orders.filter((order) => !order.completed));
    } else {
      setOrders(orders.filter((order) => order.completed));
    }
  }, [view, orders]);

  // filter based on search query
  useEffect(() => {
    if (!searchQuery) {
      setOrders(orders); // If there's no search query, return the full list of orders
      return;
    }

    const filtered = orders.filter((order) => {
      const query = searchQuery.toLowerCase();

      return (
        order.name.toLowerCase().includes(query) || // Check if name matches
        order.location?.toLowerCase().includes(query) || // Check if location matches
        order.notes?.toLowerCase().includes(query) // Check if notes match (optional chaining in case notes is undefined)
      );
    });

    setOrders(filtered); // Set filtered orders
  }, [searchQuery, orders]);

  return (
    <div>
      <div className="flex justify-between space-x-4 w-full my-4">
        {/* Orders Section */}
        <div className="rounded-xl h-12 flex border-[0.5px] w-fit overflow-x-auto duration-150">
          <button
            onClick={() => setView(0)}
            className={`w-fit px-6 py-2 transition-all duration-300 ${
              view === 0 ? "bg-white shadow-lg" : "bg-neutral-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setView(1)}
            className={`w-fit px-6 py-2 transition-all duration-300 ${
              view === 1 ? "bg-white shadow-lg" : "bg-neutral-100"
            }`}
          >
            Incomplete
          </button>
          <button
            onClick={() => setView(2)}
            className={`w-fit px-6 py-2 transition-all duration-300 ${
              view === 2 ? "bg-white shadow-lg" : "bg-neutral-100"
            }`}
          >
            Completed
          </button>
        </div>
        <div className="flex space-x-0 md:space-x-4">
          {/* Desktop Search Input */}
          {searching ? (
            <input
              type="text"
              className="w-0 h-0 md:border-2 md:h-12 md:rounded-xl hidden md:block md:w-80 px-4"
              placeholder="Search orders..."
              value={searchQuery} // Bind the input value to searchQuery state
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setView(0);
              }} // Update searchQuery when input changes
            />
          ) : null}

          {/* Filtering Buttons */}
          <div className="flex space-x-4">
            {/* Search Button */}
            <button
              onClick={() => {
                if (searching) {
                  setSearchQuery("");
                  setSearching(false);
                } else {
                  setSearching(true);
                }
              }}
              className="w-12 h-12 rounded-xl bg-white border-[0.5px] border-neutral-200 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-600"
              >
                <path
                  d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            {/* Filter Button */}
            <button
              disabled
              className="w-12 h-12 rounded-xl bg-white border-[0.5px] border-neutral-200 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className=" text-neutral-600"
              >
                <path d="M21,8H3A1,1,0,0,1,3,6H21a1,1,0,0,1,0,2Z" />
                <path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" />
                <path d="M17,18H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Z" />
              </svg>
            </button>

            {/* More Options Button */}
            <button className="w-12 h-12 rounded-xl bg-white border-[0.5px] border-neutral-200 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className=" text-neutral-600"
              >
                <path d="M18,14 C16.8954305,14 16,13.1045695 16,12 C16,10.8954305 16.8954305,10 18,10 C19.1045695,10 20,10.8954305 20,12 C20,13.1045695 19.1045695,14 18,14 Z M6,14 C4.8954305,14 4,13.1045695 4,12 C4,10.8954305 4.8954305,10 6,10 C7.1045695,10 8,10.8954305 8,12 C8,13.1045695 7.1045695,14 6,14 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div>
        {searching ? (
          <input
            type="text"
            className="w-full md:w-auto border-2 h-12 rounded-xl mb-4 px-4 md:hidden outline-none"
            placeholder="Search orders..."
            value={searchQuery} // Bind the input value to searchQuery state
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }} // Update searchQuery when input changes
          />
        ) : null}
      </div>

      <div className="rounded-xl overflow-x-auto border-[.175rem] border-neutral-200 bg-neutral-200">
        {/* Order Headers */}
        <div className="flex w-full items-center justify-left h-fit bg-neutral-50">
          <div className="mx-auto py-4 md:py-5 px-4 min-w-12">
            <CheckmarkBox name="check-all" />
          </div>

          <div className="flex flex-grow justify-between text-neutral-400 text-left gap-x-2 bg-neutral-50">
            <button
              onClick={handleSort.bind(null, "name")}
              className="flex items-center gap-x-1 px-4 py-4 md:py-5 w-60 hover:bg-neutral-100 duration-150"
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
                stroke-width="2"
                className="text-neutral-400"
              >
                <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
                <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
              </svg>
            </button>
            <button
              onClick={handleSort.bind(null, "location")}
              className="flex items-center gap-x-1 px-4 py-4 md:py-5 w-60 hover:bg-neutral-100 duration-150"
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
                stroke-width="2"
                className="text-neutral-400"
              >
                <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
                <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
              </svg>
            </button>
            <button
              onClick={handleDateSort}
              className="flex items-center gap-x-1 px-4 py-4 md:py-5 w-36 hover:bg-neutral-100 duration-150"
            >
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
                stroke-width="2"
                className="text-neutral-400"
              >
                <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
                <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
              </svg>
            </button>
            <button
              onClick={handleSortLabels}
              className="flex items-center gap-x-1 px-4 py-4 md:py-5 w-24 hover:bg-neutral-100 duration-150"
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
                stroke-width="2"
                className="text-neutral-400"
              >
                <path d="m11.25 10.75-3.25 3.5-3.25-3.5" />
                <path d="m11.25 5.25-3.25-3.5-3.25 3.5" />
              </svg>
            </button>

            <h2 className="flex items-center gap-x-1 px-4 py-4 md:py-5 w-40 hover:bg-neutral-100 duration-150">
              Status
            </h2>
            <h2 className="fl items-center gap-x-1 px-4 py-4 md:py-5 w-60 hover:bg-neutral-100 duration-150">
              Order ID
            </h2>
            <h2 className="flex items-center gap-x-1 px-4 py-4 md:py-5 w-60 hover:bg-neutral-100 duration-150">
              Actions
            </h2>
          </div>
        </div>

        {/* Order Rows */}
        <div className="space-y-[.175rem]">
          {sortedOrders.map((order) => (
            <Link
              href={`/orders/${order.id}`}
              key={order.id}
              className="flex w-max min-w-full items-center justify-left bg-white hover:bg-neutral-50"
            >
              <div className="mx-auto py-4 md:py-5 px-4 min-w-12">
                <CheckmarkBox name={`check-${order.id}`} />
              </div>

              <div className="flex flex-grow font-light justify-between text-neutral-400 text-left gap-x-2">
                <h2 className="font-normal text-neutral-500 w-60 px-4 py-4 md:py-5 flex items-center overflow-hidden whitespace-nowrap">
                  {order.name}
                </h2>
                <h2 className="w-60 px-4 py-4 md:py-5 flex items-center overflow-hidden whitespace-nowrap">
                  {order.location}
                </h2>
                <h2 className="w-36 px-4 py-4 md:py-5 flex items-center overflow-hidden whitespace-nowrap ">
                  {getFullDate(order.date)}
                </h2>
                <h2 className="w-24 px-4 py-4 md:py-5 flex items-center overflow-hidden whitespace-nowrap">
                  {order._count.labels}
                </h2>
                <h2 className="w-40 px-4 py-4 md:py-5 flex items-center font-medium">
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
                <h2 className="px-4 py-4 md:py-5 w-60 flex items-center truncate">
                  #{order.id}
                </h2>
                <h2 className="w-60 px-4 py-4 md:py-5 flex items-center gap-x-2">
                  <button
                    type="reset"
                    className="h-fit w-fit text-neutral-200 hover:text-red-500 active:text-red-600/90 duration-150"
                    onClick={() => {}}
                  >
                    <svg
                      className=""
                      fill="currentColor"
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
                  <button className="text-neutral-200 hover:text-blue-500 duration-150">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="px-[.2rem]"
                    >
                      <path
                        d="M5.11765 15.7059C3.9481 15.7059 3 14.7578 3 13.5882V5.11765C3 3.9481 3.9481 3 5.11765 3H13.5882C14.7578 3 15.7059 3.9481 15.7059 5.11765V5.64706"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="8.29413"
                        y="8.29412"
                        width="12.7059"
                        height="12.7059"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
