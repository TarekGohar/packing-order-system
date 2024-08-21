import { db } from "@/db";
import { IronSession } from "iron-session";
import { SessionData } from "@/auth";
import Link from "next/link";

interface SessionProps {
  session: IronSession<SessionData>;
}

export default async function RecentlyViewed({ session }: SessionProps) {
  const orders = await db.packingOrder.findMany({
    where: {
      author: {
        email: session.email,
      },
    },
    orderBy: {
      lastViewedAt: "desc",
    },
    take: 5,
  });

  if (orders.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl">Recently Viewed</h1>
        <p className="h-36 p-4 bg-neutral-100 rounded-xl">No orders found</p>
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-medium">Recently Viewed</h1>
        <ul className="h-36 bg-neutral-100 rounded-xl">
          <div className="grid grid-cols-4 py-4 rounded-t-xl text-center text-lg text-white font-semibold bg-neutral-400">
            <h2>Name</h2>
            <h2>Location</h2>
            <h2>Date</h2>
            <h2>Status</h2>
          </div>
          {orders.map((order, index) => (
            <li
              key={order.id}
              className={`w-full py-3 font-medium text-center text-white ${
                index % 2 === 1 ? "bg-neutral-300" : "bg-neutral-200"
              }`}
            >
              <Link
                href={`/orders/view/${order.id}`}
                className="grid grid-cols-4"
              >
                <div className="truncate sm:whitespace-normal px-2">
                  {order.name}
                </div>
                <div className="truncate sm:whitespace-normal px-1">
                  {order.location}
                </div>
                <div className="truncate sm:whitespace-normal px-1">
                  {order.date.getDate()}/{order.date.getMonth() + 1}/
                  {order.date.getFullYear()}
                </div>
                <div className="truncate sm:whitespace-normal px-2">
                  {order.completed ? "Completed" : "Incomplete"}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
