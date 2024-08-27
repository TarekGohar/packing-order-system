"use server";

import Navbar from "@/components/Navbar";
import { db } from "@/db";
import { PackingLabel } from "@prisma/client";
import OrderButton from "@/components/OrderButton";
import { submitData } from "@/actions";
import Link from "next/link";
import { revalidatePath } from "next/cache";

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

interface OrderProps {
  params: {
    orderId: string;
  };
  searchParams: {
    edit: string;
  };
}

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

export default async function page({ params, searchParams }: OrderProps) {
  const editing = "edit" in searchParams;
  let labelComplete = 0;
  const order: PackingOrder | null = await db.packingOrder.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      labels: true,
    },
  });

  if (!order) {
    return <div>Order not found</div>;
  }

  const groupedLabels = order.labels.reduce<Record<string, PackingLabel[]>>(
    (acc, label) => {
      const section = label.section || "Miscellaneous"; // Default to 'Uncategorized' if no section
      if (label.completed) {
        labelComplete++;
      }
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(label);
      return acc;
    },
    {}
  );

  if (true) {
    return (
      <div className="unselectable">
        <Navbar />
        <section className="container mx-auto space-y-8 px-6 sm:px-0">
          {/* Order Details */}
          <div className="flex justify-between rounded-xl bg-cyan-600/40 bg-gradient-to-r from-cyan-600/40 p-8">
            <div>
              <h1 className="text-3xl font-bold text-cyan-700">
                {order?.name}
              </h1>
              <div className="font-semibold text-xl text-cyan-700/90">
                {order?.location}
              </div>
              <div className="font-medium text-cyan-700/90">
                {getFullDate(order.date)}
              </div>
              <div className="font-medium text-cyan-700/90">
                {order.guests} Guests & {order.bartenders} Bartenders
              </div>
            </div>
            <h3 className="text-xl font-bold text-cyan-700">
              {labelComplete} / {order.labels.length}
            </h3>
          </div>

          {/* Order Notes (if exist) */}
          {order.notes && (
            <div className="rounded-xl bg-neutral-100/40 bg-gradient-to-r from-neutral-100/40 p-8">
              <h1 className="text-2xl font-bold text-neutral-400">Notes</h1>
              <p className="mt-2 font-medium text-neutral-400/90">
                {order.notes}
              </p>
            </div>
          )}

          {/* Order Labels */}
          <form name={order.id} action={submitData}>
            <input type="hidden" name="orderId" value={order.id} />
            <input
              type="hidden"
              name="orderLabelCount"
              value={order.labels.length}
            />
            <div className="grid grid-cols-1 gap-8">
              {Object.keys(groupedLabels).map((section) => (
                <div key={section}>
                  <h3 className="font-bold text-xl mb-2">{section}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupedLabels[section].map((label) => (
                      <OrderButton
                        key={label.id}
                        label={label}
                        holdTime={300}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Save/Cancel Changes */}
            <div className="my-12 flex justify-end gap-x-4">
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
          </form>
        </section>
      </div>
    );
  } else {
    return <div>{params.orderId}</div>;
  }
}
