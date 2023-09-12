import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useNotes } from "@/contexts/Note/NoteContext";
import { INote, updateNoteMutation } from "@/services/noteService";
import { Users2 } from "lucide-react";
import { createRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

interface AddCollaboratorModalProps {
  note: INote;
}

export function AddCollaboratorModal({ note }: AddCollaboratorModalProps) {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { updateNote } = useNotes();
  const { mutate: updateNoteMutate } = updateNoteMutation()
  const inputRef = createRef<HTMLInputElement>();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputRef.current?.value) return;
    setLoading(true);
    setError("");
    const oldCollabs = note.collabs.map((collab) => collab.name);
    if (oldCollabs.includes(inputRef.current.value)) {
        setError("Este colaborador já existe.");
        setLoading(false);
        return;
    }
    oldCollabs.push(inputRef.current.value)
    updateNoteMutate({
        id: note.id,
        collabs: [inputRef.current.value]
    }, {
        onSuccess: (newNote: INote) => {
            updateNote(newNote)
            toast({
                title: "Sucesso!",
                description: "O colaborador foi adicionado com sucesso.",
            });
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }, onError: () => {
            toast({
                title: "Erro!",
                description: "Não foi possível adicionar o colaborador.",
            });
        }
    })
    setLoading(false);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-md">
          <Users2 size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar colaborador</DialogTitle>
          <DialogDescription>
            Adicione um colaborador para editar esta nota.
          </DialogDescription>
        </DialogHeader>
        <form
          id="collab-form"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4  mt-6"
        >
          <Label htmlFor="name">Nome</Label>
          <div className="flex flex-col gap-2">
            <Input
              ref={inputRef}
              disabled={isLoading}
              type="text"
              id="name"
              name="name"
              placeholder="Digite o nome"
              className="col-span-3"
            />
            {error && <p className="ml-2 text-red-500 text-xs">{error}</p>}
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form="collab-form" disabled={isLoading}>
            {isLoading ? "Adicionando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
