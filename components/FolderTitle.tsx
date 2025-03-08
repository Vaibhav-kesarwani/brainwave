import React, { useState, useRef, useEffect } from "react";
import { AccordionTrigger } from "@/components/ui/accordion";
import { Pencil } from "lucide-react";
import DeleteFolder from "./DeleteFolder";
import { FolderWithNotes } from "@/types/User";
import { renameFolder } from "@/app/notes/_actions/actions";

export default function FolderItem({
  folder,
  selectedFolder,
  setSelectedFolder,
  setAddingNote,
  setNewNoteName,
}: {
  folder: FolderWithNotes;
  selectedFolder: string;
  setSelectedFolder: (arg0: string) => void;
  setAddingNote: (arg0: boolean) => void;
  setNewNoteName: (arg0: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newFolderName, setNewFolderName] = useState(folder.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsEditing(false);
  }, [folder]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleInputBlur = async () => {
    try {
      if (newFolderName.trim() === "") {
        setIsEditing(false);
        return;
      }
      if (newFolderName === folder.name) {
        setIsEditing(false);
        return;
      }
      if (newFolderName.length > 30) {
        setIsEditing(false);
        return;
      }
      const reponse = await renameFolder(folder.id, newFolderName);
      if (reponse.success && reponse.data) {
        // setIsEditing(false);
        setNewFolderName(reponse.data.name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  return (
    <AccordionTrigger
      disabled={isEditing}
      className="text-muted-foreground"
      onClick={() => {
        if (!isEditing) {
          setAddingNote(false);
          setNewNoteName("");
          console.log(folder.id);
          if (folder.id === selectedFolder) {
            setSelectedFolder("");
          } else {
            setSelectedFolder(folder.id);
          }
        }
      }}
    >
      {isEditing ? (
        <input
          maxLength={30}
          type="text"
          value={newFolderName}
          ref={inputRef}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="bg-transparent text-muted-foreground focus:outline-none"
          autoFocus
        />
      ) : (
        <span>{folder.name}</span>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex items-center gap-2"
      >
        {isEditing ? null : (
          <>
            <button onClick={handleEditClick}>
              <Pencil className="size-4 fill-muted-foreground stroke-none transition-colors hover:fill-foreground" />
            </button>
            <DeleteFolder
              folder={folder}
              setSelectedFolder={setSelectedFolder}
            />
          </>
        )}
      </div>
    </AccordionTrigger>
  );
}
