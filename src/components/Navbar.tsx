import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import ProfileMenu from "./ProfileMenu";
import { getSession } from "@/auth/actions";

// Implement responsive navbar with hamburger button

export default async function Navbar() {
  const session = await getSession();

  return (
    <>
      <nav className="container mx-auto flex px-4 py-8 items-center justify-between font-light text-black unselectable">
        {/* Logo Button */}
        <Link href="/dashboard" className="">
          <h1>Company Logo</h1>
        </Link>

        {/* Menu */}
        <div className="h-10 font-normal flex space-x-6 lg:space-x-12 items-center justify-end">
          {session.isLoggedIn ? (
            <>
              <DropdownMenu />
              <ProfileMenu session={session} />
            </>
          ) : (
            <Link href="/signin">
              <h2 className="">Sign In</h2>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
