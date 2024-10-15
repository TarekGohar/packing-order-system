"use client";

import Image from "next/image";
import { changeOrderDetails } from "@/actions/";
import { PackingLabel } from "@prisma/client";
import { useState } from "react";

interface OrderProps {
  labelComplete: number;
  order: PackingOrder;
}

type OrderState = {
  orderName: string;
  orderLocation: string | null;
};

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

function getDaySuffix(day: number): string {
  const lastDigit = day % 10;
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th"; // Special case for 11th, 12th, 13th
  }

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function getFullDate(date: Date): string {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${weekdays[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}${getDaySuffix(date.getDate())} ${date.getFullYear()}`;
}

export default function ShowOrderDetails({ labelComplete, order }: OrderProps) {
  const [editing, setEditing] = useState(true);
  const [{ orderName, orderLocation }, setOrder] = useState<OrderState>({
    orderName: order?.name,
    orderLocation: order?.location,
  });

  return editing ? (
    <div className="grid grid-cols-9 gap-x-2 rounded-xl bg-cyan-600/40 bg-gradient-to-r from-cyan-600/40 p-8">
      <div className="col-span-7">
        <h1 className="text-2xl font-bold text-cyan-700 truncate">
          {order?.name}
        </h1>
        <div className="font-semibold text-xl text-cyan-700/90 truncate">
          {order?.location}
        </div>
        <div className="font-medium text-cyan-700/90">
          {getFullDate(order.date)}
        </div>
        <div className="font-medium text-cyan-700/90">
          {order.guests} Guests & {order.bartenders} Bartenders
        </div>
      </div>

      <div className="col-span-2 flex flex-col-reverse items-end justify-between">
        <h3 className="text-md font-bold text-cyan-700">
          {labelComplete} / {order.labels.length}
        </h3>
        <button onClick={() => setEditing(false)}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 24 24"
            data-name="24x24/On Light/Edit"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-cyan-700/20 text-cyan-800 rounded-md w-7 h-7 p-[2px]"
          >
            <path
              d="M4 20.75a.751.751 0 0 1-.75-.75v-4.181a.755.755 0 0 1 .22-.53L14.711 4.05a2.72 2.72 0 0 1 3.848 0l1.391 1.391a2.72 2.72 0 0 1 0 3.848L8.712 20.53a.747.747 0 0 1-.531.22Zm.75-4.621v3.121h3.12l7.91-7.91-3.12-3.12Zm12.091-5.849 2.051-2.051a1.223 1.223 0 0 0 0-1.727l-1.393-1.394a1.222 1.222 0 0 0-1.727 0L13.72 7.16Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : (
    <form
      action={changeOrderDetails}
      className="flex justify-between rounded-xl bg-cyan-600/40 bg-gradient-to-r from-cyan-600/40 p-8"
      onSubmit={() => {
        setTimeout(() => {
          setEditing(true);
        }, 250);
      }}
    >
      <div className="flex flex-col">
        <input type="hidden" name="orderId" value={order.id} />
        <input
          type="text"
          name="order-name"
          value={orderName}
          max={20}
          required
          className="w-full text-2xl font-bold text-cyan-700 bg-black bg-opacity-5 rounded-sm outline-none"
          onChange={(e) => {
            if (e.target.value.length > 25) {
              return;
            }
            setOrder({
              orderName: e.target.value,
              orderLocation,
            });
          }}
        />
        <input
          type="text"
          name="order-location"
          value={orderLocation ?? "N/A"}
          className="w-full font-semibold text-xl text-cyan-700/90 bg-black bg-opacity-5 rounded-sm outline-none"
          onChange={(e) => {
            setOrder({
              orderLocation: e.target.value,
              orderName,
            });
          }}
        />
        <div className="font-medium text-cyan-700/90">
          {getFullDate(order.date)}
        </div>
        <div className="font-medium text-cyan-700/90">
          {order.guests} Guests & {order.bartenders} Bartenders
        </div>
      </div>

      <div className="flex flex-col-reverse items-end justify-between">
        <h3 className="text-md font-bold text-cyan-700">
          {labelComplete} / {order.labels.length}
        </h3>
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="270"
            height="270"
            viewBox="0 0 270 270"
            className="bg-cyan-700/20 rounded-md w-7 h-7 p-1"
          >
            <path
              fill="none"
              stroke="#0e7490"
              strokeWidth="30"
              d="M30 180l60 60L240 30"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
