"use server";
import prisma from "@/db";
import { FolderWithNotes, NoteWithFolder } from "@/types/User";
import { Folder, Note } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addNote({
  title,
  folderId,
  clerkId,
  order,
}: {
  title: string;
  folderId: string;
  clerkId: string;
  order: number;
}) {
  try {
    if (!title || !folderId || !clerkId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.create({
      data: {
        title: title,
        content: "",
        userId: clerkId,
        folderId: folderId,
        order: order,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function createFolder(
  folderName: string,
  clerkId: string,
  order: number,
) {
  try {
    if (!folderName || !clerkId || !order) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.create({
      data: {
        name: folderName,
        userId: clerkId,
        order: order,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function trashFolder(folderId: string, date: Date) {
  try {
    if (!folderId) {
      return { success: false, data: null, error: "Missing required fields" };
    }

    const trashedFolder = await prisma.$transaction(async (prisma) => {
      const folder = await prisma.folder.update({
        where: {
          id: folderId,
        },
        data: {
          trashed: true,
          trashedDate: date,
        },
      });

      await prisma.note.updateMany({
        where: {
          folderId: folderId,
        },
        data: {
          trashed: true,
          trashedDate: date,
        },
      });

      return folder;
    });

    revalidatePath("/notes");

    return { success: true, data: trashedFolder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}
export async function trashNote(noteId: string, date: Date) {
  try {
    if (!noteId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        trashed: true,
        trashedDate: date,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function updateNoteTitle(noteId: string, title: string) {
  try {
    if (!noteId || !title) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function saveNote(noteId: string, content: string) {
  try {
    if (!noteId || !content) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        content: content,
      },
    });
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function restoreNote(note: NoteWithFolder) {
  try {
    if (!note) {
      return { success: false, data: null, error: "Missing required fields" };
    }

    const parentFolder = await prisma.folder.findUnique({
      where: {
        id: note.folderId,
      },
    });

    if (!parentFolder) {
      return { success: false, data: null, error: "Parent folder not found" };
    }

    if (parentFolder.trashed) {
      return {
        success: false,
        data: null,
        error: "Parent folder is trashed. Restore the parent folder first.",
      };
    }

    const newNote = await prisma.note.update({
      where: {
        id: note.id,
      },
      data: {
        trashed: false,
        trashedDate: null,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: newNote, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteNote(noteId: string) {
  try {
    if (!noteId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const note = await prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function restoreFolder(folder: FolderWithNotes) {
  try {
    if (!folder || !folder.id) {
      return { success: false, data: null, error: "Missing required fields" };
    }

    const updatedFolder = await prisma.folder.update({
      where: {
        id: folder.id,
      },
      data: {
        trashed: false,
        trashedDate: null,
      },
    });

    revalidatePath("/notes");
    return { success: true, data: updatedFolder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteFolder(folderId: string) {
  try {
    if (!folderId) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function renameFolder(folderId: string, name: string) {
  try {
    if (!folderId || !name) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: name,
      },
    });
    revalidatePath("/notes");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function updateNoteOrder(
  folderId: string,
  reorderedNotes: Note[],
) {
  try {
    if (!folderId || !reorderedNotes) {
      return { success: false, data: null, error: "Missing required fields" };
    }

    // Fetch the folder to ensure it exists
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        notes: true,
      },
    });

    if (!folder) {
      return { success: false, data: null, error: "Folder not found" };
    }

    // Use a transaction to update the order of each note
    await prisma.$transaction(
      reorderedNotes.map((note, index) =>
        prisma.note.update({
          where: { id: note.id },
          data: { order: index + 1 }, // Assuming you have an order field in your note model
        }),
      ),
    );

    // Fetch the updated folder with notes to return as response
    const updatedFolder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      include: {
        notes: true,
      },
    });

    return { success: true, data: updatedFolder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function updateFolderOrder(reorderedFolders: Folder[]) {
  try {
    if (!reorderedFolders || reorderedFolders.length === 0) {
      return { success: false, data: null, error: "Missing required fields" };
    }

    // Fetch the folders to ensure they exist
    const existingFolders = await prisma.folder.findMany({
      where: {
        id: { in: reorderedFolders.map((folder) => folder.id) },
      },
    });

    if (existingFolders.length !== reorderedFolders.length) {
      return { success: false, data: null, error: "Some folders not found" };
    }

    // Use a transaction to update the order of each folder
    await prisma.$transaction(
      reorderedFolders.map((folder, index) =>
        prisma.folder.update({
          where: { id: folder.id },
          data: { order: index + 1 }, // Assuming you have an order field in your folder model
        }),
      ),
    );

    // Fetch the updated folders with notes to return as response
    const updatedFolders = await prisma.folder.findMany({
      where: {
        id: { in: reorderedFolders.map((folder) => folder.id) },
      },
      include: {
        notes: true,
      },
    });

    return { success: true, data: updatedFolders, error: null };
  } catch (error: any) {
    console.error("Error updating folder order:", error);
    return { success: false, data: null, error: error.message };
  }
}

export async function deleteAllTrashedFolders(id: string) {
  try {
    if (!id) {
      return { success: false, data: null, error: "Missing required fields" };
    }
    const folder = await prisma.folder.deleteMany({
      where: {
        userId: id,
        trashed: true,
      },
    });
    console.log("deleted", folder);
    revalidatePath("/notes/trash");
    return { success: true, data: folder, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}

export async function deleteAllTrashedNotes(id: string) {
  try {
    if (!id) {
      return { success: false, data: null, error: "Missing required fields" };
    }

    const notesToDelete = await prisma.note.findMany({
      where: {
        userId: id,
        trashed: true,
      },
    });

    console.log("notesToDelete", notesToDelete);

    const note = await prisma.note.deleteMany({
      where: {
        userId: id,
        trashed: true,
      },
    });

    console.log("deleted", note);

    revalidatePath("/notes/trash");
    return { success: true, data: note, error: null };
  } catch (e: any) {
    console.log(e);
    return { success: false, data: null, error: e.message };
  }
}
