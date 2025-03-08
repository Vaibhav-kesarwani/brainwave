"use client";
import React from "react";
import { NoteWithFolder, FolderWithNotes } from "@/types/User";
import { Loader, Trash, Undo2 } from "lucide-react";

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

import { toast } from "sonner";

export default function TrashOptions({
  data,
  restoreMethod,
  deleteMethod,
}: {
  data: NoteWithFolder | FolderWithNotes;
  restoreMethod: Function;
  deleteMethod: Function;
}) {
  const [loading, setLoading] = React.useState(false);
  async function handleRestore() {
    try {
      setLoading(true);
      const response = await restoreMethod(data);
      if (response.success) {
        console.log(response.data);
      } else {
        console.log(response.error);
        toast.error(response.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);
      const response = await deleteMethod(data.id);
      if (response.success) {
        console.log(response.data);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div>
        <Loader className="size-5 animate-spin" />
      </div>
    );

  return (
    <div className="flex items-center gap-2">
      {/* Restore  */}
      <AlertDialog>
        <AlertDialogTrigger>
          <button disabled={loading}>
            <Undo2 className="size-5" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to restore this item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestore}>
              Restore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete  */}

      <AlertDialog>
        <AlertDialogTrigger>
          <button disabled={loading}>
            <Trash className="size-5" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to permanently delete this item. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
