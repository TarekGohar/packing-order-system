import Navbar from "@/components/Navbar";
import { db } from "@/db";
import { PackingLabel } from "@prisma/client";
import OrderButton from "@/components/OrderButton";

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

  if (true) {
    return (
      <div>
        <Navbar />
        <section className="container mx-auto space-y-8 px-4 sm:px-0">
          <div className="rounded-xl bg-cyan-600/40 bg-gradient-to-r from-cyan-600/40 p-8">
            <h1 className="text-3xl font-bold text-cyan-700">{order?.name}</h1>
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
          {order.notes && (
            <div className="rounded-xl bg-neutral-100/40 bg-gradient-to-r from-neutral-100/40 p-8">
              <h1 className="text-2xl font-bold text-neutral-400">Notes</h1>
              <p className="mt-2 font-medium text-neutral-400/90">
                {order.notes}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {order.labels.map((label, index) => (
              <OrderButton
                key={label.id}
                value={label.value}
                curVal={label.currentValue}
                comment={label.comment || ""}
                name={label.key}
                holdTime={400}
              />
            ))}
          </div>
          <div className="py-72 flex justify-between">
            <button className="bg-neutral-200/50 px-6 py-4 rounded-xl font-semibold text-neutral-400 hover:bg-neutral-200/80 active:bg-neutral-200 duration-150 unselectable">
              Cancel
            </button>
            <button className="bg-green-600 px-6 py-4 rounded-xl font-semibold text-white hover:bg-green-700/90 active:bg-green-700 duration-150 unselectable">
              Save Changes
            </button>
          </div>
        </section>
      </div>
    );
  } else {
    return <div>{params.orderId}</div>;
  }
}

// model PackingOrder {
//     id          String         @id @default(uuid()) // Unique identifier
//     name        String
//     location    String?
//     date        DateTime
//     bartenders  Int
//     guests      Int
//     notes       String?
//     createdAt   DateTime       @default(now())      // Timestamp for order creation
//     lastViewedAt DateTime
//     updatedAt   DateTime       @updatedAt           // Timestamp for order update
//     completed   Boolean        @default(false)
//     labels      PackingLabel[] // Relation to the PackingLabel model

//     author    User    @relation(fields: [authorId], references: [id])
//     authorId  String
//   }
