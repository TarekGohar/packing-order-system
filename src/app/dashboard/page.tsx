import { getSession } from "@/auth/actions";
import ViewOrders from "@/components/dashboard/ViewOrders";
import { db } from "@/db";
import Navbar from "@/components/Navbar";
import { revalidatePath } from "next/cache";

function capitalize(str: string): string {
  if (!str) return str; // Guard clause for empty string
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
    months[date.getMonth() + 1]
  } ${date.getDate()}${getDaySuffix(date.getDate())} ${date.getFullYear()}`;
}

export default async function Dashboard() {
  revalidatePath("/dashboard");
  const session = await getSession();

  const user = await db.user.findUnique({ where: { email: session.email } });

  if (!user) {
    throw new Error("User not found");
  }

  const recentlyViewedOrders = await db.packingOrder.findMany({
    where: {
      author: {
        email: session.email,
      },
    },
    orderBy: {
      lastViewedAt: "desc",
    },
  });

  const mostRecentOrders = await db.packingOrder.findMany({
    where: {
      author: {
        email: session.email,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!recentlyViewedOrders || !mostRecentOrders) {
    throw new Error("Orders not found");
  }

  const today = new Date();

  return (
    <section>
      <Navbar />
      <div className="container mx-auto px-6">
        <div className="rounded-xl bg-cyan-600/40 bg-gradient-to-r from-cyan-600/40 p-8">
          <h1 className="text-3xl font-bold mb-4 text-cyan-700">Dashboard</h1>
          <div className="font-semibold text-xl text-cyan-700/90">
            Hello, {capitalize(user?.first_name)}
          </div>
          <div className="font-medium text-cyan-700/90">
            Today is {getFullDate(today)}
          </div>
        </div>

        <div className="my-10 md:px-6 space-y-8 ">
          <ViewOrders title={"Recently Viewed"} orders={recentlyViewedOrders} />
          <ViewOrders title={"Most Recent"} orders={mostRecentOrders} />
        </div>
      </div>
    </section>
  );
}
