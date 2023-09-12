import { Injectable } from "@nestjs/common";
import { User } from "src/User/domain/user.entity";
import { UserService } from "src/User/user.service";
import { Note } from "./domain/note.entity";
import { NoteRepository } from "./infra/database/note-repository";

@Injectable()
export class NoteService {
    constructor(private noteRepository: NoteRepository, private userService: UserService) {}

    async getNoteById(id: string) {
        const note = await this.noteRepository.findById(id)
        return note
    }

    async updateNoteText(id: string, text: string) {
        const note = await this.noteRepository.findById(id)
        note.updateText(text)
        await this.noteRepository.save(note)
    }

    async updateNoteCollab(id: string, collab: string[]) {
        const user = await this.userService.getUserByUsername(collab[0])
        if (!user) {
            return null
        }
        const note = await this.noteRepository.findById(id)
        note.addNewCollaborator(user.name)
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

    async deleteNote(id: string, userId: string) {
        const note = await this.noteRepository.findById(id)
        if (note.userId.toString() !== userId) {
            return null
        }
        return this.noteRepository.delete(note)
    }
}