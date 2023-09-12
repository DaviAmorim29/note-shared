import { useNotes } from "@/contexts/Note/NoteContext";
import { INote } from "@/services/noteService";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface DeleteNoteModalProps {
  note: INote;
}

export function DeleteNoteModal({ note }: DeleteNoteModalProps) {
  const [isLoading, setLoading] = useState(false);
  const { deleteNote } = useNotes();
  const navigate = useNavigate()
  async function handleSubmit() {
    setLoading(true);
    try {
      await deleteNote(note.id);
      console.log('Chega auqi ?')
      toast({
        title: "Sucesso!",
        description: "Nota removida.",
      });
      navigate('/notes')
    } catch (E) {
        console.error(E)
      toast({
        title: "Erro!",
        description: "Não foi possível remove a nota.",
      });
    }
    setLoading(false);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-md">
            <DeleteIcon size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja remover a note ?</AlertDialogTitle>
          <AlertDialogDescription>
            Não terá como voltar atrás
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Voltar</AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={handleSubmit}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
