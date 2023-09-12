import { INote, addNoteRequest, deleteNoteRequest, getNotes, updateNote } from "@/services/noteService";
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { NoteContext } from "./NoteContext";

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth()

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const addNote = async (newNote: {title: string}) => {
    const note = await addNoteRequest(newNote)
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  const editNote = async (noteId: string, updatedNote: INote) => {
    await updateNote(updatedNote)
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === noteId ? updatedNote : note))
    );
  };

  const deleteNote = async (noteId: string) => {
    await deleteNoteRequest(noteId);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const getNote = (noteId: string) => {
    return notes.find((note) => note.id === noteId) || null
  }

  return (
    <NoteContext.Provider value={{ 
        notes,
        addNote,
        editNote,
        deleteNote,
        getNote,
        isLoading: loading,
      }}>
      {children}
    </NoteContext.Provider>
  );
};