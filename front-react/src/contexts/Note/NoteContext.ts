import { INote } from "@/services/noteService";
import { createContext, useContext } from "react";

interface INoteContext {
    notes: INote[];
    getNote: (id: string) => INote | null
    addNote: (note: {title: string}) => Promise<void>;
    editNote: (noteId: string, updatedNote: INote) => Promise<void>;
    deleteNote: (noteId: string) => Promise<void>;
    isLoading: boolean;
}

export const NoteContext = createContext<INoteContext>({} as INoteContext)

export const useNotes = () => useContext(NoteContext)