import Link from "next/link";

export default function OrderActions() {
  return (
    <div className="flex flex-grow justify-center md:justify-between gap-x-2 md:gap-x-12">
      <Link
        href={"/orders/create"}
        className="bg-green-500 px-8 md:px-12 w-full py-8 rounded-xl text-white text-2xl"
      >
        <h1 className="font-semibold">Create</h1>
        <p className="text-base">Create a new packing order</p>
      </Link>

      <Link
        href={"/orders/view"}
        className="bg-neutral-500 px-8 md:px-12 w-full py-8 rounded-xl text-white text-2xl"
      >
        <h1 className="font-semibold">View</h1>
        <p className="text-base">View existing packing orders</p>
      </Link>
    </div>
  );
}
