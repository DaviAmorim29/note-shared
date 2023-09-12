import { socket } from "@/lib/utils";
import { UpdateNoteDTO, updateNoteMutation } from "@/services/noteService";
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

interface TextEditorProps {
    defaultText: string;
    noteId: string
}
export function TextEditor({ defaultText, noteId }: TextEditorProps) {
    const [noteText, setNoteText] = useState(defaultText)
    const { mutate: updateNoteMutate } = updateNoteMutation()
    const debouncedSave = useCallback(
		debounce((nextValue: UpdateNoteDTO) => updateNoteMutate(nextValue, {onError: () => {toast({
            title: 'Erro!',
            description: 'Não foi possível salvar a nota.',
        })}}), 1000),
		[],
	);
    useEffect(() => {
        socket.emit('join', noteId)
        socket.on('updateText', ({ id, text }) => {
            if (id !== id) return
            if (text === noteText) return
            setNoteText(noteText)
        })
        return () => {
            socket.emit('leave', noteId)
        }
    }, [])
    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteText(e.target.value)
        socket.emit('updateText', { id: noteId, text: e.target.value })
        debouncedSave({ id: noteId, text: e.target.value })
    }
    return (
        <div>
            <textarea className="bg-zinc-300  rounded-md w-full h-64 p-2 focus:outline-none" value={noteText} onChange={handleChangeText} />
        </div>
    )
}