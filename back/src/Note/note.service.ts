import { Injectable } from "@nestjs/common";
import { User } from "src/User/domain/user.entity";
import { Note } from "./domain/note.entity";
import { NoteRepository } from "./infra/database/note-repository";

@Injectable()
export class NoteService {
    constructor(private noteRepository: NoteRepository) {}

    async getNoteById(id: string) {
        const note = await this.noteRepository.findById(id)
        return note
    }

    async updateNoteText(id: string, text: string) {
        const note = await this.noteRepository.findById(id)
        note.updateText(text)
        await this.noteRepository.save(note)
    }

    async createNote({title, user}: {title: string, user: User}) {
        const note = new Note({
            title,
            userId: user.uniqueEntityId
        })
        await this.noteRepository.save(note)
        return note
    }

    async getNoteUsers({userId}: {userId: string}) {
        const note = await this.noteRepository.findByAuthor(userId)
        return note
    }
}