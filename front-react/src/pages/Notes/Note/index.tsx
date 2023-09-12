import { Header } from "@/components/Header"
import { AddCollaboratorModal } from "@/components/Note/AddCollaboratorModal"
import { DeleteNoteModal } from "@/components/Note/DeleteNoteModal"
import { TextEditor } from "@/components/Note/TextEditor"
import { PageLink } from "@/components/PageLink"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/Auth/AuthContext"
import { useNotes } from "@/contexts/Note/NoteContext"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export function NotePage() {
    const { noteId } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    if (!user) {
        navigate('/login')
        return null
    }
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
            <Header.Container>
                <div>
                    <PageLink href='/notes'><Button size="icon" variant={'outline'}><ArrowLeft size={16} /></Button></PageLink>
                    <Header.Title>
                        <h1 className="font-bold text-2xl mt-4">Título: <span className="font-normal">{note.title}</span></h1>
                    </Header.Title>
                </div>
                <div className="flex flex-row gap-2">
                    {note.user.id === user.user.id  && <AddCollaboratorModal note={note} />}
                    {note.user.id === user.user.id  && <DeleteNoteModal note={note} />}
                </div>
            </Header.Container>
                <div className="flex flex-row">
                    {note.user.id === user.user.id && (
                    <><h2 className="text-lg font-semibold">Colaboradores: </h2>
                    <div className="gap-2 flex flex-row items-end ml-2 mb-[1.5px]">
                        {note.collabs.map((collab, i) => {
                            const index = i + 1
                            return <p key={collab.id} className="text-sm">{collab.name}{note.collabs.length === index ? '.' : ','}</p>
                        })}
                    </div></>)}
                    {note.user.id !== user.user.id && (
                    <><h2 className="text-lg font-semibold">Criado por: </h2>
                    <div className="gap-2 flex flex-row items-end ml-2 mb-[1.5px]">
                        <p className="text-sm">{note.user.name}.</p>
                    </div></>)}
                </div>
            <Header.Divider />
            <TextEditor defaultText={note.text} noteId={noteId} />
        </main>
    )
}