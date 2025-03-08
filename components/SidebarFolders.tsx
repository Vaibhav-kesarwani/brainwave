import React, { useEffect, useRef, useState } from "react";
import SidebarOptions from "./SidebarOptions";
import UserDetails, { FolderWithNotes } from "@/types/User";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Folder, GripVertical, Loader } from "lucide-react";
import {
  addNote,
  createFolder,
  updateFolderOrder,
  updateNoteOrder,
} from "@/app/notes/_actions/actions";
import { useRouter } from "next/navigation";
import FolderItem from "./FolderTitle";
import { Reorder, useDragControls } from "framer-motion";
import debounce from "lodash/debounce";

export default function SidebarFolders({
  userDetails,
  addingNote,
  setAddingNote,
  addingFolder,
  setAddingFolder,
  selectedFolder,
  setSelectedFolder,
  allFolders,
  setIsOpen,
}: {
  userDetails: UserDetails | null;
  addingNote: boolean;
  setAddingNote: (arg0: boolean) => void;
  addingFolder: boolean;
  setAddingFolder: (arg0: boolean) => void;
  selectedFolder: string;
  setSelectedFolder: (arg0: string) => void;
  allFolders: FolderWithNotes[];
  setIsOpen?: (arg0: boolean) => void;
}) {
  const newNoteRef = useRef<HTMLInputElement>(null);
  const newFolderRef = useRef<HTMLInputElement>(null);
  const [newNoteName, setNewNoteName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [folders, setFolders] = useState(allFolders);
  const dragControls = useDragControls();

  useEffect(() => {
    if (newNoteRef.current) {
      newNoteRef.current.focus();
    }
  }, [newNoteRef, addingNote]);

  useEffect(() => {
    if (newFolderRef.current) {
      newFolderRef.current.focus();
    }
  }, [newFolderRef, addingFolder]);

  useEffect(() => {
    setAddingFolder(false);
    setAddingNote(false);
    setNewFolderName("");
    setNewNoteName("");
  }, [allFolders, setAddingFolder, setAddingNote]);

  useEffect(() => {
    setFolders(allFolders);
  }, [allFolders]);

  const handleNoteReorder = async (folderId: string, reorderedNotes: any[]) => {
    try {
      setLoading(true);
      const response = await updateNoteOrder(folderId, reorderedNotes);
      if (response.success) {
        console.log("Note order updated successfully.");
      } else {
        console.log("Failed to update note order:", response.error);
        throw new Error("Failed to update note order");
      }
    } catch (error) {
      console.error("Error updating note order: ", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleNoteReorder = useRef(
    debounce((folderId: string, reorderedNotes: any[]) => {
      handleNoteReorder(folderId, reorderedNotes);
    }, 1000),
  ).current;

  const handleLocalNoteReorder = (folderId: string, reorderedNotes: any[]) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId ? { ...folder, notes: reorderedNotes } : folder,
      ),
    );
    debouncedHandleNoteReorder(folderId, reorderedNotes);
  };

  const handleFolderReorder = async (reorderedFolders: FolderWithNotes[]) => {
    try {
      setLoading(true);
      const response = await updateFolderOrder(reorderedFolders);
      if (response.success) {
        console.log("Folder order updated successfully.");
      } else {
        console.error("Failed to update folder order:", response.error);
      }
    } catch (error) {
      console.error("Error updating folder order:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleFolderReorder = useRef(
    debounce((reorderedFolders: any[]) => {
      handleFolderReorder(reorderedFolders);
    }, 1000),
  ).current;

  const handleLocalFolderReorder = (reorderedFolders: any[]) => {
    setFolders(reorderedFolders);
    debouncedHandleFolderReorder(reorderedFolders);
  };

  return (
    <div>
      <SidebarOptions
        addingNote={addingNote}
        setAddingNote={setAddingNote}
        addingFolder={addingFolder}
        setAddingFolder={setAddingFolder}
        setIsOpen={setIsOpen}
      />
      <hr className="mt-4" />

      <h4 className="mt-4 px-4 text-sm font-bold text-muted-foreground">
        Notes
      </h4>
      <div className="flex flex-col">
        <div className="mt-3 flex-grow">
          {!addingFolder && allFolders.length === 0 && (
            <p className="px-4 text-sm text-muted-foreground">
              Create a folder to get started.
            </p>
          )}

          <Accordion type="single" collapsible>
            <Reorder.Group
              axis="y"
              values={folders}
              onReorder={handleLocalFolderReorder}
            >
              {folders.map((folder) => (
                <Reorder.Item key={folder.id} value={folder}>
                  <AccordionItem value={folder.id} className="border-0">
                    <FolderItem
                      folder={folder}
                      selectedFolder={selectedFolder}
                      setSelectedFolder={setSelectedFolder}
                      setAddingNote={setAddingNote}
                      setNewNoteName={setNewNoteName}
                    />

                    <AccordionContent className="mt-1">
                      <Reorder.Group
                        axis="y"
                        values={folder.notes}
                        onReorder={(newOrder) =>
                          handleLocalNoteReorder(folder.id, newOrder)
                        }
                        className="w-full space-y-2 pr-5"
                      >
                        {folder.notes.map((note) => (
                          <Reorder.Item key={note.id} value={note}>
                            <div className="flex w-full items-center justify-between gap-1">
                              <Link
                                href={`/notes/${note.id}`}
                                key={note.id}
                                onClick={() => {
                                  setIsOpen && setIsOpen(false);
                                }}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                              >
                                {note.title}
                              </Link>
                              <div
                                onPointerDown={(event) =>
                                  dragControls.start(event)
                                }
                                className="cursor-grab active:cursor-grabbing"
                              >
                                <GripVertical className="size-4 fill-muted-foreground stroke-[1px]" />
                              </div>
                            </div>
                          </Reorder.Item>
                        ))}
                      </Reorder.Group>

                      {folder.notes.length === 0 && !addingNote && (
                        <div className="text-sm text-muted-foreground">
                          No notes in this folder
                        </div>
                      )}
                      {addingNote && selectedFolder == folder.id && (
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const trimmedNoteName = newNoteName.trim();
                            if (!trimmedNoteName) {
                              console.log("Note name is empty. Exiting...");
                              setNewNoteName("");
                              setAddingNote(false);
                              return;
                            }
                            try {
                              setLoading(true);
                              const response = await addNote({
                                title: trimmedNoteName,
                                folderId: folder.id,
                                clerkId: userDetails?.clerkId as string,
                                order: folder.notes.length + 1,
                              });
                              if (response.success) {
                                console.log(
                                  "Note added successfully:",
                                  response,
                                );
                                router.push(`/notes/${response.data?.id}`);
                              } else {
                                console.log("Failed to add note:", response);
                              }
                            } catch (error) {
                              console.error("Error adding note:", error);
                            } finally {
                              setLoading(false);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={newNoteName}
                              ref={newNoteRef}
                              disabled={loading}
                              maxLength={30}
                              onChange={(e) => setNewNoteName(e.target.value)}
                              onBlur={(e) => {
                                e.preventDefault();
                                e.target.form!.dispatchEvent(
                                  new Event("submit", {
                                    cancelable: true,
                                    bubbles: true,
                                  }),
                                );
                              }}
                              className="mt-2 bg-windowBackground text-sm text-muted-foreground placeholder:text-muted-foreground focus:outline-none"
                              placeholder="New Note"
                            />
                            {loading && (
                              <div className="flex items-center justify-start gap-2 pr-5">
                                <Loader className="h-4 w-4 animate-spin" />
                              </div>
                            )}
                          </div>
                        </form>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </Accordion>

          {addingFolder && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!newFolderName) {
                  console.log("Folder name is empty. Exiting...");
                  setAddingFolder(false);
                  return;
                }
                if (newFolderName.length > 20) {
                  console.log(
                    "Folder name too long. Max length is 20 characters.",
                  );
                  return;
                }
                try {
                  setLoading(true);
                  const response = await createFolder(
                    newFolderName,
                    userDetails?.clerkId as string,
                    folders.length + 1,
                  );
                  if (response.success) {
                    console.log("Folder created successfully:", response);
                  } else {
                    console.log("Failed to create folder:", response);
                  }
                } catch (error) {
                  console.error("Error creating folder:", error);
                } finally {
                  setLoading(false);
                }
              }}
            >
              <span className="flex items-center justify-between gap-2 px-4 py-2">
                <div className="flex flex-1 items-center gap-2">
                  <Folder fill="#737373" stroke="none" className="size-4" />
                  <input
                    type="text"
                    ref={newFolderRef}
                    disabled={loading}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    maxLength={30}
                    onBlur={(e) => {
                      e.preventDefault();
                      e.target.form!.dispatchEvent(
                        new Event("submit", {
                          cancelable: true,
                          bubbles: true,
                        }),
                      );
                    }}
                    className="w-[20px] flex-1 bg-transparent text-muted-foreground placeholder:text-muted-foreground focus:outline-none"
                    placeholder="New Folder"
                  />
                </div>
                {loading && (
                  <div className="flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                  </div>
                )}
              </span>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
