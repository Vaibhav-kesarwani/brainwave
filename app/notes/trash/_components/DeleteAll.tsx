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
import {
  deleteAllTrashedFolders,
  deleteAllTrashedNotes,
} from "../../_actions/actions";
import { currentUser } from "@clerk/nextjs/server";
import { useGlobalContext } from "@/providers/global-context";
export function DeleteAllNotesButton() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { clientUser } = useGlobalContext();
  async function handleDeleteAllTrashedNotes() {
    try {
      setLoading(true);
      const response = await deleteAllTrashedNotes(clientUser!.clerkId);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="text-sm font-medium hover:underline">
          Delete All
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete all notes in your trash. You will not be
            able to recover them after this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAllTrashedNotes}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteAllFoldersButton() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { clientUser } = useGlobalContext();
  async function handleDeleteAllTrashedFolders() {
    try {
      setLoading(true);
      const response = await deleteAllTrashedFolders(clientUser!.clerkId);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-sm font-medium hover:underline">
          Delete All
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete all folders in your trash. All notes in
            these folders will be permanently deleted as well. You will not be
            able to recover them after this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAllTrashedFolders}>
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
