import { getSession } from "@/auth/actions";
import MostRecent from "@/components/dashboard/MostRecent";
import OrderActions from "@/components/dashboard/OrderActions";
import RecentlyViewed from "@/components/dashboard/RecentlyViewed";
import { db } from "@/db";
import Navbar from "@/components/Navbar";

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
  const session = await getSession();

  const user = await db.user.findUnique({ where: { email: session.email } });

  if (!user) {
    throw new Error("User not found");
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

        <div className="mt-10 md:px-6 space-y-8 ">
          <OrderActions />
          <MostRecent session={session} />
          <RecentlyViewed session={session} />
        </div>
      </div>
    </section>
  );
}
