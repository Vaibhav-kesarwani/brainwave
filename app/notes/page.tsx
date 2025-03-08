import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import RecentNotes from "../_components/RecentNotes";
import SearchInput from "../_components/SearchInput";
import LoadingSearch from "./loading";

export default async function Search() {
  const user = await currentUser();
  const allNotes = await prisma.note.findMany({
    where: {
      userId: user?.id,
      trashed: false,
      folder: {
        trashed: false,
      },
    },
    orderBy: {
      order: "asc",
    },
    include: {
      folder: true,
    },
  });
  const recent = allNotes.slice(0, 7);

  return (
    <div className="w-full px-5 pb-10 pt-8 lg:p-12">
      {recent.length > 0 && <RecentNotes notes={recent} />}
      <SearchInput allNotes={allNotes} />
    </div>
  );
}
