import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNotes } from "@/contexts/Note/NoteContext";
import { Plus } from "lucide-react";
import { createRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

// interface AddNoteModalProps {
//     note: INote
// }

export function AddNoteModal() {
    const [error, setError] = useState('')
    const [isLoading, setLoading] = useState(false)
    const { addNote } = useNotes()
    const inputRef = createRef<HTMLInputElement>()
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!inputRef.current?.value) return
        setLoading(true)
        setError('')
        await addNote({ title: inputRef.current?.value || '' })
        toast({
            title: 'Sucesso!',
            description: 'A nota foi adicionada com sucesso.',
        })
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        setLoading(false)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={'icon'} className="rounded-md p-2 hover:bg-zinc-600 active:bg-zinc-500 duration-75">
                    <Plus size={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        Adicionar nota
                    </DialogTitle>
                    {/* <DialogDescription>
                        Adicione um colaborador para editar esta nota.
                    </DialogDescription> */}
                </DialogHeader>
                <form id='add-form' onSubmit={handleSubmit} className="flex flex-col gap-4  mt-6">
                    <Label htmlFor="name">Titulo</Label>
                    <div className="flex flex-col gap-2">
                        <Input ref={inputRef} disabled={isLoading} type='text' id='name' name="name" placeholder="Digite o nome" className="col-span-3" />
                        {error && <p className="ml-2 text-red-500 text-xs">{error}</p>}
                    </div>
                </form>
                <DialogFooter>
                    <Button type='submit' form="add-form" disabled={isLoading}>
                         {isLoading ? 'Adicionando...' : 'Adicionar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}