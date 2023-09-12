import { useNotes } from "@/contexts/Note/NoteContext";
import { socket } from "@/lib/utils";
import { INote, UpdateNoteDTO, updateNoteMutation } from "@/services/noteService";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

const clientId = Math.random().toString(36).substring(7)

// const debouncedSave = debounce((nextValue: UpdateNoteDTO) => updateNote(nextValue),5000)

interface TextEditorProps {
    defaultText: string;
    noteId: string
}
export function TextEditor({ defaultText, noteId }: TextEditorProps) {
    const [noteText, setNoteText] = useState(defaultText)
    const { updateNote } = useNotes()
    const { mutate: updateNoteMutate } = updateNoteMutation()
    const debouncedSave = useCallback(
		debounce((nextValue: UpdateNoteDTO) => updateNoteMutate(nextValue, {onSuccess: (newNote: INote) => {
            toast({
                title: 'Sucesso!',
                description: 'Nota salva com sucesso.',
                duration: 2000
            })
            updateNote(newNote)
        },onError: () => {toast({
            title: 'Erro!',
            description: 'Não foi possível salvar a nota.',
        })}}), 2500),
		[],
	);
    useEffect(() => {
        socket.emit('join', noteId)
        socket.on('updateText', ({ id, text: requestText, clientId: requestClientId }) => {
            if (id !== noteId) return
            if (clientId === requestClientId) return
            setNoteText(requestText)
        })
        return () => {
            socket.emit('leave', noteId)
        }
    }, [noteId])
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        socket.emit('updateText', { id: noteId, text: newValue, clientId})
        setNoteText(newValue)
        debouncedSave({id: noteId , text: newValue || ' '})
    }
    return (
        <div>
            <textarea className="bg-zinc-200  rounded-md w-full h-64 p-2 focus:outline-none" value={noteText} onChange={handleChangeText} />
        </div>
    )
}