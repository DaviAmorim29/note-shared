import { Note } from "../../domain/note.entity";

export abstract class NoteRepository {
    abstract save(note: Note): Promise<void>

    abstract updateText(note: Note): Promise<void>

    abstract delete(note: Note): Promise<void>

    abstract findById(id: string): Promise<Note>

    abstract findByAuthor(id: string): Promise<Note[]>
}