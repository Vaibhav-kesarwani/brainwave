"use client";
import React, { useState } from "react";
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
import { Trash } from "lucide-react";
import { trashFolder } from "@/app/notes/_actions/actions";
import { usePathname, useRouter } from "next/navigation";
import { FolderWithNotes } from "@/types/User";

export default function DeleteFolder({
  folder,
  setSelectedFolder,
}: {
  folder: FolderWithNotes;
  setSelectedFolder: Function;
}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const notesInsideFolder = folder.notes.map((note) => note.id);
  async function deleteFolderHandler() {
    try {
      setLoading(true);
      const response = await trashFolder(folder.id, new Date());
      if (response.success) {
        if (notesInsideFolder.includes(pathname.split("/")[2])) {
        }
        setSelectedFolder("");
        console.log("Folder deleted");
        setOpen(false);
        router.push("/notes");
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="ml-auto" disabled={loading}>
          <Trash className="size-4 fill-muted-foreground stroke-none transition-colors hover:fill-destructive" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You are about to delete this folder
          </AlertDialogTitle>
          <AlertDialogDescription>
            This folder along with all of its notes will be moved to the trash
            folder for 15 days before being permanently deleted.
            <p className="text-sm text-destructive-foreground">{error}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              deleteFolderHandler();
            }}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
