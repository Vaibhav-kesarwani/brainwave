import prisma from "@/db";
import React from "react";
import NoteTitle from "./_components/NoteTitle";
import TextEditor from "@/components/TextEditor";
import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import LoadingNote from "./loading";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function getDaysRemaining(date: Date) {
  // 15 - days covered from given date:
  const daysRemaining =
    15 -
    Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return daysRemaining;
}

export default async function Note({ params }: { params: { noteId: string } }) {
  const user = await currentUser();
  if (!user) {
    return RedirectToSignIn;
  }
  const note = await prisma.note.findUnique({
    where: {
      userId: user.id,
      id: params.noteId,
    },
  });

  if (!note) {
    return <div>Note not found</div>;
  }

  if (note.trashed) {
    return (
      <div className="p-4 lg:px-16 lg:py-12">
        <h1 className="text-3xl font-black">Note trashed</h1>
        <p className="text-sm text-muted-foreground">
          This note has been moved to the trash bin and will be deleted in{" "}
          {getDaysRemaining(note.trashedDate as Date)} days. If you want to
          restore this note, kindly recover it from the trash bin.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full px-6 py-10 lg:px-16 lg:py-12">
        <NoteTitle note={note} />
        <hr className="mt-4" />
        <TextEditor note={note} />
      </div>
    </div>
  );
}
