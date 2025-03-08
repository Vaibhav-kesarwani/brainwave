import { Folder, Note, User } from "@prisma/client";

export interface FolderWithNotes extends Folder {
  notes: {
    id: string;
    title: string;
  }[];
}

export interface NoteWithFolder extends Note {
  folder: Folder;
}
interface UserDetails extends User {
  folders: FolderWithNotes[];
}

export default UserDetails;
