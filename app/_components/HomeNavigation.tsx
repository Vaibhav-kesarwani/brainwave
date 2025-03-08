import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function HomeNavigation() {
  return (
    <nav className="flex h-[6rem] w-full items-center justify-center pb-4 pt-6">
      <div className="flex h-full w-full max-w-2xl items-center justify-between rounded-xl bg-windowBackground pl-4 pr-6 shadow-lg">
        <Link
          href="/"
          className="flex items-center gap-4 text-base font-extrabold"
        >
          <Image
            src="/icon.png"
            alt="Logo"
            width={100}
            height={100}
            className="size-5"
          />
          <span>Brain Wave</span>
        </Link>
        <SignedIn>
          <div className="flex items-center gap-4">
            <Link href="/notes" className="text-sm font-medium hover:underline">
              Notes
            </Link>
            <SignOutButton>
              <button className="text-sm font-medium hover:underline">
                Logout
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="text-sm font-medium hover:underline">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}
