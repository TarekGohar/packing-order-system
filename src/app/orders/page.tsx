import { getSession } from "@/auth/actions";
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
  const session = await getSession();

  const user = await db.user.findUnique({ where: { email: session.email } });

  if (!user) {
    throw new Error("User not found");
  }

  const orders = await db.packingOrder.findMany({
    include: {
      _count: {
        select: { labels: true },
      },
    },
  });

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

        <div className="flex justify-between w-full my-4">
          {/* Orders Section */}
          <div className="rounded-xl flex border-[0.5px] w-fit overflow-hidden">
            <button className="px-6 py-2 shadow-lg">All</button>
            <button className="px-6 py-2  bg-neutral-100">Incomplete</button>
            <button className="px-6 py-2 bg-neutral-100">Completed</button>
          </div>

          <div className="flex space-x-4">
            {/* Search Button */}
            <button className="w-12 h-12 rounded-xl bg-white border-[0.5px] border-neutral-200 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-600"
              >
                <path
                  d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            {/* Menu Button */}
            <button className="w-12 h-12 rounded-xl bg-white border-[0.5px] border-neutral-200 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className=" text-neutral-600"
              >
                <path d="M21,8H3A1,1,0,0,1,3,6H21a1,1,0,0,1,0,2Z" />
                <path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" />
                <path d="M17,18H7a1,1,0,0,1,0-2H17a1,1,0,0,1,0,2Z" />
              </svg>
            </button>

            {/* More Options Button */}
            <button className="w-12 h-12 rounded-xl bg-white border-[0.5px] border-neutral-200 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className=" text-neutral-600"
              >
                <path d="M18,14 C16.8954305,14 16,13.1045695 16,12 C16,10.8954305 16.8954305,10 18,10 C19.1045695,10 20,10.8954305 20,12 C20,13.1045695 19.1045695,14 18,14 Z M6,14 C4.8954305,14 4,13.1045695 4,12 C4,10.8954305 4.8954305,10 6,10 C7.1045695,10 8,10.8954305 8,12 C8,13.1045695 7.1045695,14 6,14 Z M12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 Z" />
              </svg>
            </button>
          </div>
        </div>

        <OrdersViewer orders={orders} />
      </div>
    </section>
  );
}
