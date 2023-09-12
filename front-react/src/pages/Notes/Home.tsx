import { Header } from "@/components/Header";
import { AddNoteModal } from "@/components/Note/AddNoteModal";
import { PageLink } from "@/components/PageLink";
import { useNotes } from "@/contexts/Note/NoteContext";
import { truncateText } from "@/lib/utils";
import { INote } from "@/services/noteService";

export function Home() {
  const { isLoading, notes } = useNotes();
  return (
    <main>
      <Header.Container>
        <Header.Title>Notas</Header.Title>
        <Header.Button>
          <AddNoteModal />
        </Header.Button>
      </Header.Container>
      <Header.Divider />
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div>Carregando...</div>
        ) : (
          notes.map((note: INote) => (
            <PageLink href={`/notes/${note.id}`}>
              <div className="p-4 flex flex-row justify-start rounded-md  duration-75 cursor-pointer bg-zinc-300  hover:bg-zinc-200 active:bg-zinc-400">
                <h2>{note.title}</h2>
                <p className="text-xs font-thin">{truncateText(note.text)}</p>
              </div>
            </PageLink>
          ))
        )}
      </div>
    </main>
  );
}
