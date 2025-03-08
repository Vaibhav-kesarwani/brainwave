import prisma from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import TrashOptions from "./_components/TrashOptions";
import {
  deleteFolder,
  deleteNote,
  restoreFolder,
  restoreNote,
} from "../_actions/actions";
import {
  DeleteAllFoldersButton,
  DeleteAllNotesButton,
} from "./_components/DeleteAll";
import { Note } from "@prisma/client";
import { FolderWithNotes, NoteWithFolder } from "@/types/User";

function getDaysRemaining(date: Date) {
  // 15 - days covered from given date:
  const daysRemaining =
    15 -
    Math.floor(
      (new Date().getTime() - date?.getTime()) / (1000 * 60 * 60 * 24),
    );
  return daysRemaining;
}

export default async function Trash() {
  const user = await currentUser();
  const trashedNotes = await prisma.note.findMany({
    where: {
      userId: user?.id,
      OR: [{ trashed: true }, { folder: { trashed: true } }],
    },
    orderBy: {
      trashedDate: "desc",
    },
    include: {
      folder: true,
    },
  });

  const trashedFolders = await prisma.folder.findMany({
    where: {
      userId: user?.id,
      trashed: true,
    },
    orderBy: {
      trashedDate: "desc",
    },
    include: {
      notes: true,
    },
  });

  return (
    <div className="noscrollbar flex h-full w-full flex-col gap-2 overflow-y-auto px-5 pb-10 pt-8 lg:p-12">
      <h1 className="text-3xl font-black">Trash</h1>
      <p className="text-sm text-muted-foreground">
        Notes and Folders that are placed in your trash.
      </p>
      <hr className="mb-3 mt-2" />
      <div className="mt-2 flex w-full items-center justify-between">
        <h2 className="text-2xl font-bold">Notes</h2>
        {trashedNotes.length > 0 && <DeleteAllNotesButton />}
      </div>

      <TrashedNotesList trashedNotes={trashedNotes} />

      <div className="mt-4 flex w-full items-center justify-between">
        <h2 className="text-2xl font-bold">Folders</h2>
        {trashedFolders.length > 0 && <DeleteAllFoldersButton />}
      </div>

      <TrashedFoldersList trashedFolders={trashedFolders} />
    </div>
  );
}

interface TrashedNotesProps {
  trashedNotes: NoteWithFolder[];
}

interface TrashedFoldersProps {
  trashedFolders: FolderWithNotes[];
}

function TrashedNotesList(props: TrashedNotesProps) {
  const { trashedNotes } = props;
  return (
    <div className="mt-2 flex flex-col gap-2">
      {trashedNotes.map((note) => (
        <div
          key={note.id}
          className="mt-1 flex items-center justify-between gap-4"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold">{note.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {note.trashedDate
                    ? getDaysRemaining(note.trashedDate as Date)
                    : note.folder.trashedDate
                      ? getDaysRemaining(note.folder.trashedDate as Date)
                      : 0}{" "}
                  days left
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {note.folder?.name}
              </p>
            </div>

            <TrashOptions
              data={note}
              restoreMethod={restoreNote}
              deleteMethod={deleteNote}
            />
          </div>
        </div>
      ))}

      {trashedNotes.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You have no notes in the trash.
        </p>
      )}
    </div>
  );
}

function TrashedFoldersList(props: TrashedFoldersProps) {
  const { trashedFolders } = props;
  return (
    <div className="mt-2 flex h-full flex-1 flex-col gap-2 pb-8">
      {trashedFolders.map((folder) => (
        <div
          key={folder.id}
          className="mt-2 flex items-center justify-between gap-4"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{folder.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {getDaysRemaining(folder.trashedDate as Date)} days left
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {folder.notes.length} notes
              </p>
            </div>

            <TrashOptions
              data={folder}
              restoreMethod={restoreFolder}
              deleteMethod={deleteFolder}
            />
          </div>
        </div>
      ))}

      {trashedFolders.length === 0 && (
        <p className="text-sm text-muted-foreground">
          You have no folders in the trash.
        </p>
      )}
    </div>
  );
}
