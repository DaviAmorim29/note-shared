import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNotes } from "@/contexts/Note/NoteContext";
import { INote } from "@/services/noteService";
import { Users2 } from "lucide-react";
import { createRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

interface AddCollaboratorModalProps {
    note: INote
}

export function AddCollaboratorModal({ note }: AddCollaboratorModalProps) {
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)
    const { editNote } = useNotes()
    const inputRef = createRef<HTMLInputElement>()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!inputRef.current?.value) return
        setLoading(true)
        setError('')
        await editNote(note.id, { ...note, collaborators: [...note.collaborators, inputRef.current?.value || ''] }).catch(() => {
            setError('Não foi possível adicionar o colaborador.')
        })
        toast({
            title: 'Sucesso!',
            description: 'O colaborador foi adicionado com sucesso.',
        })
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        setLoading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-zinc-300 rounded-md p-2 hover:bg-zinc-400 active:bg-zinc-500 duration-75">
                    <Users2 size={20} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Adicionar colaborador
                    </DialogTitle>
                    <DialogDescription>
                        Adicione um colaborador para editar esta nota.
                    </DialogDescription>
                </DialogHeader>
                <form id='collab-form' onSubmit={handleSubmit} className="flex flex-col gap-4  mt-6">
                    <Label htmlFor="name">Nome</Label>
                    <div className="flex flex-col gap-2">
                        <Input ref={inputRef} disabled={isLoading} type='text' id='name' name="name" placeholder="Digite o nome" className="col-span-3" />
                        {error && <p className="ml-2 text-red-500 text-xs">{error}</p>}
                    </div>
                </form>
                <DialogFooter>
                    <Button type='submit' form="collab-form" disabled={isLoading}>
                         {isLoading ? 'Adicionando...' : 'Adicionar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}