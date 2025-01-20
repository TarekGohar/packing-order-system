import DropdownSelector from "@/components/DropdownSelector";
import { db } from "@/db";
import OrdersViewer from "@/components/orders/OrdersViewer";

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

export default async function OrdersPage() {
  const orders = await db.packingOrder.findMany({
    include: {
      _count: {
        select: { labels: true },
      },
    },
  });

  // TODO: limit how many orders are fetched and improve search functionality

  return (
    <section>
      <div className="container mx-auto px-[12px]">
        {/* Page Header */}
        <div className="rounded-xl bg-cyan-600/40 bg-gradient-to-r from-cyan-600/40 p-8">
          <h1 className="text-3xl font-bold mb-4 text-cyan-700">Orders</h1>
          <DropdownSelector
            name={"date-range"}
            placeholder={"Select a date range"}
            options={["Jan 1 - Jan 30, 2024", "Feb 1 - Feb 28, 2024"]}
          />
        </div>

        <OrdersViewer orders={orders} />
      </div>
    </section>
  );
}
