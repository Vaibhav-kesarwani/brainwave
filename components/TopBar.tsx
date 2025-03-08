import React from "react";
import CurrentTime from "./CurrentTime";
import { currentUser } from "@clerk/nextjs/server";
import { LogOut, Power } from "lucide-react";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default async function TopBar() {
  const user = await currentUser();
  return (
    <div className="flex h-12 w-full items-center justify-center bg-foregroundSecondary text-white dark:bg-hover">
      <div className="mx-auto flex w-full max-w-[98%] items-center justify-end px-4 py-2 lg:justify-between">
        <span className="hidden opacity-0 lg:block lg:opacity-100">
          <CurrentTime />
        </span>
        <Link href={"/"} className="hidden font-bold lg:block">
          Nota Rapida
        </Link>
        <div className="flex items-center gap-3 font-light">
          <p>{user?.fullName}</p> <LogoutButton />
        </div>
      </div>
    </div>
  );
}
