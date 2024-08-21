import Link from "next/link";
import Image from "next/image";

export default function OrderActions() {
  return (
    <div className="flex flex-grow justify-center md:justify-between gap-x-6 md:gap-x-12 sm:hidden">
      <Link
        href={"/orders/create"}
        className="flex items-center justify-between bg-green-500 px-4 py-4 md:px-12 w-full rounded-xl text-white text-2xl"
      >
        <h1 className="w-fit font-semibold">Create</h1>
        <Image
          width={40}
          height={40}
          alt="create post svg"
          src="images/create-post.svg"
          className=""
        />
      </Link>

      <Link
        href={"/orders/create"}
        className="flex items-center justify-between bg-neutral-500 px-4 py-4 md:px-12 w-full rounded-xl text-white text-2xl"
      >
        <h1 className="w-fit font-semibold">View</h1>
        <Image
          width={40}
          height={40}
          alt="create post svg"
          src="images/view.svg"
          className=""
        />
      </Link>
    </div>
  );
}
