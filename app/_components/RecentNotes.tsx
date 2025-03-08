import { NoteWithFolder } from "@/types/User";
import { Note } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RecentNotes({ notes }: { notes: NoteWithFolder[] }) {
  return (
    <div className="mb-10 flex flex-col gap-1">
      <div>
        <h1 className="text-3xl font-black">Recent Notes</h1>
        <p className="text-sm text-muted-foreground">
          Quickly access your most recent notes.
        </p>
      </div>
      <div className="mt-2 space-y-1">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="flex select-none items-center gap-2 font-medium transition-all duration-500 hover:underline"
          >
            <Image
              src="/page.png"
              width={20}
              height={20}
              alt="page"
              className="size-5 dark:invert"
            />
            <h2>{note.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
