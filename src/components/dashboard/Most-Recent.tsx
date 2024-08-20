import { db } from "@/db";
import { IronSession } from "iron-session";
import { SessionData } from "@/auth";

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
      <div>
        <h1>Recently Viewed</h1>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <a href={`/orders/${order.id}`}>{order.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
