import { UniqueEntityId } from "src/@seed/value-object/unique-entity-id.vo"
import { Note, NoteProps } from "../../domain/note.entity"

export class NoteMapper {
    static toDomain(raw: NoteProps, id?: string): Note {
        const noteOrError = Note.create(raw, id ? new UniqueEntityId(id) : undefined)
        return noteOrError
    }

    static toPersistence(note: Note) {
        return note.toCustomJSON()
    }
}