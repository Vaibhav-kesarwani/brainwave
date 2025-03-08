"use client";
import { Note } from "@prisma/client";
import { Check, PenLine, Save, Trash } from "lucide-react";
import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { trashNote, updateNoteTitle } from "../../_actions/actions";

export default function NoteTitle({ note }: { note: Note }) {
  const [enableEdit, setEnableEdit] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(note.title);
  const [loading, setLoading] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    if (enableEdit && ref.current) {
      ref.current.focus();
    }
  }, [enableEdit]);

  async function handleNoteDeletion(noteId: string) {
    try {
      setLoading(true);
      const response = await trashNote(noteId, new Date());
      if (response.success) {
        router.push("/notes");
      } else {
        console.log(response.error);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  async function updateNoteTitleHandler(noteId: string, title: string) {
    try {
      setLoading(true);
      const response = await updateNoteTitle(noteId, title);
      if (response.success) {
        if (ref.current) {
          ref.current.value = title;
        }
        setNewTitle(title);
      } else {
        console.log(response.error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-6">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setEnableEdit(false);
            if (newTitle == note.title) return;
            if (newTitle.trim() == "") {
              if (ref.current) {
                ref.current.value = note.title;
              }
              return;
            }
            const trimmedTitle = newTitle.trim();
            const response = await updateNoteTitleHandler(
              note.id,
              trimmedTitle,
            );
          }}
          className="w-full"
        >
          <div className="flex w-full items-center justify-between">
            <input
              disabled={!enableEdit}
              defaultValue={note.title}
              ref={ref}
              onChange={(e) => setNewTitle(e.target.value)}
              size={1}
              style={{
                lineHeight: "1.1",
                height: "auto",
                minWidth: "0",
              }}
              className="max-h-full flex-[1] bg-transparent text-2xl font-bold focus:outline-none disabled:text-foreground lg:w-full"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEnableEdit(!enableEdit)}
                type={enableEdit ? "button" : "submit"}
              >
                {enableEdit ? (
                  <Check className="size-6 stroke-muted-foreground stroke-2" />
                ) : (
                  <PenLine className="size-6 fill-muted-foreground stroke-none" />
                )}
              </button>
              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                  <button type="button">
                    <Trash className="size-6 fill-muted-foreground stroke-none transition-colors hover:fill-destructive" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Note</AlertDialogTitle>
                    <AlertDialogDescription>
                      You are about to delete this note. This note will be moved
                      to the trash bin and will be permenantly deleted in 15
                      days.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async (e) => {
                        e.preventDefault();
                        await handleNoteDeletion(note.id);
                      }}
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-1 text-sm text-muted-foreground">
        {new Date(note.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {" | "}
        {new Date(note.createdAt).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </div>
  );
}
