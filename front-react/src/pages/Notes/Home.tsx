import { Header } from "@/components/Header";
import { AddNoteModal } from "@/components/Note/AddNoteModal";
import { NoteList } from "@/components/Note/NoteList";
import { useAuth } from "@/contexts/Auth/AuthContext";
import { useNotes } from "@/contexts/Note/NoteContext";
import { Navigate } from "react-router-dom";

export function Home() {
  const { isLoading, notes } = useNotes();
  const { user, logout } = useAuth()
  if (!user) {
    return Navigate({
      to: '/login'
    })
  }
  return (
    <main>
      <Header.Container>
        <Header.Title>
          Notas
        </Header.Title>
        <AddNoteModal />
      </Header.Container>
      <h2 className="font-bold">User: <span className="font-normal">{user.user.name}</span></h2>
      <Header.Divider />
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          <NoteList userId={user.user.id} notes={notes} />
        )}
    </main>
  );
}
