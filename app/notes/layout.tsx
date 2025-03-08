import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const folders = await prisma.folder.findMany({
    where: {
      AND: {
        trashed: false,
        userId: user?.id,
      },
    },
    include: {
      notes: {
        where: {
          trashed: false,
        },
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4">
      <main className="noscrollbar relative my-auto flex h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden overflow-y-auto rounded-3xl bg-windowBackground shadow-lg">
        <TopBar />
        <div className="flex flex-1">
          <SideBar allFolders={folders} />
          <div className="flex-[3]">{children}</div>
        </div>
      </main>
    </div>
  );
}
