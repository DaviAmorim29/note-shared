import { truncateText } from "@/lib/utils";
import { INote } from "@/services/noteService";
import { PageLink } from "../PageLink";

export function NoteList({userId, notes}: {userId: string,notes: INote[]}) {
    const userNotes = notes.filter((note) => note.user.id === userId);
    const collaboratorNotes = notes.filter((note) =>
        note.collabs.some((collab) => collab.id === userId)
    );
    return (
    <div>
        {userNotes.length !== 0 && <h2>Suas Notas:</h2>}
        <div className="flex flex-col gap-2 mt-2">
            {userNotes.map((note) => (
                <PageLink href={`/notes/${note.id}`} key={note.id}>
                    <div className="p-4 flex flex-col justify-start rounded-md duration-75 cursor-pointer bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 gap-2">
                    <h2>{note.title}</h2>
                    <p className="text-xs font-thin">{truncateText(note.text, 80)}</p>
                    </div>
                </PageLink>
            ))}
            {userNotes.length === 0 && (
               <div className="h-16 w-full bg-zinc-200 flex items-center justify-center rounded-md">
                    <span className="text-zinc-600">Você não possui nenhuma nota</span>
                </div>
            )}
        </div>

        <h2 className="mt-6">Notas em que você colabora:</h2>
        <div className="flex flex-col gap-2 mt-2">
            {collaboratorNotes.map((note) => (
            <PageLink href={`/notes/${note.id}`} key={note.id}>
                <div className="p-4 flex flex-col justify-start rounded-md duration-75 cursor-pointer bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-400 gap-2">
                <h2>{note.title}</h2>
                <p className="text-xs font-thin">{truncateText(note.text, 80)}</p>
                </div>
            </PageLink>
            ))}
        </div>
    </div>
    );
}