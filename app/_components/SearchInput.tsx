"use client";
import { NoteWithFolder } from "@/types/User";
import { Note } from "@prisma/client";
import Link from "next/link";
import React, { useEffect } from "react";
export default function SearchInput({
  allNotes,
}: {
  allNotes: NoteWithFolder[];
}) {
  const [query, setQuery] = React.useState("");
  const [filteredNotes, setFilteredNotes] = React.useState<Note[]>([]);

  useEffect(() => {
    if (query.length === 0) {
      setFilteredNotes([]);
      return;
    }
    const filteredNotes = allNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase()) ||
        note.folder.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredNotes(filteredNotes);
  }, [query, allNotes]);
  return (
    <div>
      <h1 className="text-3xl font-black">Search Notes</h1>
      <p className="text-sm text-muted-foreground">
        Quickly search for your notes and jot your thoughts down.
      </p>
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => setQuery(e.target.value)}
        className="mt-3 w-full max-w-md rounded-md bg-[#fcfdff] px-3 py-3 text-sm font-medium text-foreground shadow-sm focus:outline-none dark:bg-[#262626]"
      />
      {filteredNotes.length > 0 && (
        <div className="mt-5">
          <ul className="flex flex-col gap-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              {filteredNotes.length} results found
            </h4>
            {filteredNotes.map((note) => (
              <Link href={`/notes/${note.id}`} key={note.id} className="group">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h4 className="font-medium text-foreground group-hover:underline">
                      {note.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {note.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      )}
      {query.length > 0 && filteredNotes.length === 0 && (
        <div className="mt-3 text-sm text-muted-foreground">
          No notes found.
        </div>
      )}
      {query.length == 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Your search results will appear here.
        </p>
      )}
    </div>
  );
}
