import { Header } from "@/components/Header"
import { AddCollaboratorModal } from "@/components/Note/AddCollaboratorModal"
import { DeleteNoteModal } from "@/components/Note/DeleteNoteModal"
import { TextEditor } from "@/components/Note/TextEditor"
import { useNotes } from "@/contexts/Note/NoteContext"
import { useParams } from "react-router-dom"

export function NotePage() {
    const { noteId } = useParams()
    if (!noteId) return (
        <main>
            <Header.Container>
                <Header.Title>
                    Nota não encontrada - 404
                </Header.Title>
            </Header.Container>
        </main>
    )
    const { getNote, isLoading } = useNotes()
    if (isLoading) return (
        <main>
            <Header.Container>
                <Header.Title>
                    Carregando...
                </Header.Title>
            </Header.Container>
        </main>
    )
    const note = getNote(noteId)
    if (!note) return (
        <main>
            <Header.Container>
                <Header.Title>
                    Nota não encontrada - 404
                </Header.Title>
            </Header.Container>
        </main>
    )
    return (
        <main>
            <header className="flex flex-col">
                <div className="justify-between flex flex-row">
                    <h1 className="font-bold text-2xl">{note.title}</h1>
                    <div className="flex flex-row gap-2">
                        <AddCollaboratorModal note={note} />
                        <DeleteNoteModal note={note} />
                    </div>
                </div>
                <div className="flex flex-row">
                    <h2 className="text-lg font-semibold">Colaboradores: </h2>
                    <div className="gap-2 flex flex-row items-end ml-2 mb-[1.5px]">
                        {note.collaborators.map((collab, i) => {
                            const index = i + 1
                            return <p key={collab} className="text-sm">{collab}{note.collaborators.length === index ? '.' : ','}</p>
                        })}
                    </div>
                </div>
            </header>
            <div className="h-1 w-full bg-zinc-700 my-6"></div>
            <TextEditor defaultText={note.text} noteId={noteId} />
        </main>
    )
}