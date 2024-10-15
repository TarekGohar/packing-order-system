"use server";

import Navbar from "@/components/Navbar";
import { db } from "@/db";
import { PackingLabel } from "@prisma/client";
import ShowOrderNotes from "@/components/orders/ShowOrderNotes";
import ShowOrderDetails from "@/components/orders/ShowOrderDetails";
import ShowOrderLabels from "@/components/orders/ShowOrderLabels";

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
      <section>
        <Navbar />
        <div className="container mx-auto min-h-[80vh] space-y-8 md:px-[24px] px-[12px]">
          <ShowOrderDetails labelComplete={labelComplete} order={order} />
          <ShowOrderNotes order={order} />
          <ShowOrderLabels order={order} groupedLabels={groupedLabels} />
        </div>
      </section>
    );
  } else {
    return <div>{params.orderId}</div>;
  }
}
