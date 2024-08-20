import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { db } from "@/db";
import Link from "next/link";
import { SessionData } from "@/auth";
import { IronSession } from "iron-session";
import { signout } from "@/auth/actions";

interface ProfileMenuProps {
  session: IronSession<SessionData>;

  // define the props for the ProfileMenu component
}

export default async function ProfileMenu({ session }: ProfileMenuProps) {
  // Query the user by email
  const user = await db.user.findUnique({
    where: { email: session.email },
    select: { first_name: true, last_name: true },
  });

  // Check if user was found
  if (!user) {
    throw new Error("User not found");
  }

  const initials =
    user.first_name.charAt(0).toUpperCase() +
    user.last_name.charAt(0).toUpperCase();

  return (
    <div className="flex justify-center">
      <Popover className="group">
        <PopoverButton className="transition-none flex items-center justify-center gap-x-2 focus:outline-none">
          <h1 className="p-3 bg-neutral-100 rounded-full">{initials}</h1>
        </PopoverButton>
        <PopoverPanel
          transition
          anchor={{ to: "bottom end", offset: "10px", gap: "20px" }}
          className="shadow-md divide-y divide-neutral-200/5 opacity-[98%] rounded-xl bg-neutral-100 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
        >
          <div className="p-3">
            <Link
              className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
              href="#"
            >
              <p className="font-semibold text-black">Account Settings</p>
              <p className="text-black/50">Manage personal settings</p>
            </Link>
            <a
              className="block rounded-lg py-2 px-3 transition hover:bg-white/5"
              href="#"
            >
              <p className="font-semibold text-black">Help Center</p>
              <p className="text-black/50">
                Get assistance with the app or service
              </p>
            </a>
          </div>
          <form action={signout}>
            <button className="w-full h-12 font-semibold bg-neutral-200/40 hover:bg-neutral-200/80 active:bg-neutral-200/120 text-black rounded-lg mt-8 duration-150">
              Sign Out
            </button>
          </form>
        </PopoverPanel>
      </Popover>
    </div>
  );
}
