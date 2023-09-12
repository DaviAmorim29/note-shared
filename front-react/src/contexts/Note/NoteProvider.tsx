import { INote, getNotes } from "@/services/noteService";
import { ReactNode, useEffect, useState } from "react";
import { NoteContext } from "./NoteContext";

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const data = await getNotes();
      setNotes(data);
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const addNote = async (newNote: INote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = async (updatedNote: INote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote
      }
      return note
    })
    setNotes(updatedNotes)
  };


  const deleteNote = async (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const getNote = (noteId: string) => {
    return notes.find((note) => note.id === noteId) || null
  }

  return (
    <NoteContext.Provider value={{ 
        notes,
        addNote,
        updateNote,
        deleteNote,
        getNote,
        
        isLoading: loading,
      }}>
      {children}
    </NoteContext.Provider>
  );
};