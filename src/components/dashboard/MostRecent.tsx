import { db } from "@/db";
import { IronSession } from "iron-session";
import { SessionData } from "@/auth";
import Link from "next/link";

interface SessionProps {
  session: IronSession<SessionData>;
}

export default async function MostRecent({ session }: SessionProps) {
  const orders = await db.packingOrder.findMany({
    where: {
      author: {
        email: session.email,
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  if (orders.length === 0) {
    return (
      <div className="space-y-2">
        <h1 className="text-xl">Most Recent</h1>
        <p className="h-36 p-4 bg-neutral-100 rounded-xl">No orders found</p>
      </div>
    );
  } else {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-medium">Most Recent</h1>
        <ul className="divide-y rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 py-3 text-center text-sm text-white font-semibold bg-neutral-300 divide-x">
            <h2>Name</h2>
            <h2>Location</h2>
            <h2>Date</h2>
            <h2>Status</h2>
          </div>
          {orders.map((order, index) => (
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
        </ul>
      </div>
    );
  }
}
