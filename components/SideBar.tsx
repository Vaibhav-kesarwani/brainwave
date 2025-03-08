"use client";
import React, { useEffect, useRef, useState } from "react";

import { Menu, SquareChevronLeft, X } from "lucide-react";
import { useGlobalContext } from "@/providers/global-context";
import SidebarFolders from "./SidebarFolders";
import { FolderWithNotes } from "@/types/User";
import { SidebarOptionsMobile } from "./SidebarOptions";

export default function SideBar({
  allFolders,
}: {
  allFolders: FolderWithNotes[];
}) {
  const { selectedFolder, setSelectedFolder, clientUser } = useGlobalContext();
  const [addingNote, setAddingNote] = useState(false);
  const [addingFolder, setAddingFolder] = useState(false);
  const [collpased, setCollapsed] = useState(false);

  return (
    <>
      <MobileSideBar allFolders={allFolders} />
      <div
        className={`hidden lg:block ${
          collpased ? "w-[50px]" : "flex-[1]"
        } noscrollbar h-full max-w-sm overflow-y-auto border-r pb-12 transition-all duration-300`}
      >
        <div className="px-4 py-4">
          <button
            onClick={() => setCollapsed(!collpased)}
            className="relative ml-auto flex w-fit items-center justify-center font-bold"
          >
            <SquareChevronLeft
              className={`size-6 stroke-muted-foreground ${collpased ? "rotate-180" : ""} transition-transform`}
            />
          </button>
        </div>

        {!collpased && (
          <SidebarFolders
            userDetails={clientUser}
            allFolders={allFolders}
            addingNote={addingNote}
            setAddingNote={setAddingNote}
            addingFolder={addingFolder}
            setAddingFolder={setAddingFolder}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
          />
        )}
      </div>
    </>
  );
}

function MobileSideBar({ allFolders }: { allFolders: FolderWithNotes[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [addingFolder, setAddingFolder] = useState(false);
  const { selectedFolder, setSelectedFolder, clientUser } = useGlobalContext();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-5 top-3 text-foreground lg:hidden"
      >
        {isOpen ? (
          <X className="size-6 text-white" />
        ) : (
          <Menu className="size-6 text-white" />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute z-[48] h-full w-full lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`${
          isOpen ? "translate-x-0 border-r" : "-translate-x-[100%] border-0"
        } absolute left-0 z-[49] h-full w-3/4 bg-windowBackground py-5 transition-all duration-300 lg:hidden`}
      >
        <SidebarFolders
          addingFolder={addingFolder}
          setAddingFolder={setAddingFolder}
          addingNote={addingNote}
          setAddingNote={setAddingNote}
          allFolders={allFolders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          userDetails={clientUser}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
}
