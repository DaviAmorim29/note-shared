import { INote } from "@/services/noteService";
import { createContext, useContext } from "react";

interface INoteContext {
    notes: INote[];
    getNote: (id: string) => INote | null
    addNote: (note: INote) => Promise<void>;
    updateNote: (updatedNote: INote) => Promise<void>;
    // addNoteCollab: (noteId: string, collabName: string) => Promise<void>;
    deleteNote: (noteId: string) => Promise<void>;
    isLoading: boolean;
}

export const NoteContext = createContext<INoteContext>({} as INoteContext)

export const useNotes = () => useContext(NoteContext)