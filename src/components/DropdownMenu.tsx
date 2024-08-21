import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Link from "next/link";

export default function DropdownMenu() {
  return (
    <div className="sm:flex justify-center hidden">
      <Popover className="group">
        <PopoverButton className="transition-none flex items-center justify-center gap-x-2 focus:outline-none">
          <h2 className="text-sm/6 font-normal text-neutral-400 focus:outline-none group-active:text-neutral-600 group-hover:text-neutral-500 duration-200">
            Orders
          </h2>
          <svg
            className="fill-neutral-400 group-hover:fill-neutral-500 group-active:fill-neutral-600 duration-200"
            height="12px"
            width="12px"
            viewBox="0 0 330 330"
          >
            <path d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z" />
          </svg>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor={{ to: "bottom end", offset: "10px", gap: "20px" }}
          className="shadow-md divide-y divide-neutral-200/5 opacity-[98%] rounded-xl bg-neutral-50 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <div className="p-3">
            <Link
              className="block rounded-lg py-2 px-3 transition hover:bg-neutral-100 active:bg-neutral-200 duration-150"
              href="/orders/create"
            >
              <p className="font-semibold text-black">Create</p>
              <p className="text-black/50">Create a new packing order</p>
            </Link>
            <Link
              className="block rounded-lg py-2 px-3 transition hover:bg-neutral-100 active:bg-neutral-200 duration-150"
              href="#"
            >
              <p className="font-semibold text-black">View</p>
              <p className="text-black/50">View existing packing orders</p>
            </Link>
          </div>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
