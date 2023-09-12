import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/User/domain/user.entity";
import { UserService } from "src/User/user.service";
import { Note } from "./domain/note.entity";
import { NoteRepository } from "./infra/database/note-repository";

@Injectable()
export class NoteService {
    constructor(private noteRepository: NoteRepository, private userService: UserService) {}

    async getNoteById(id: string) {
        const note = await this.noteRepository.findById(id)
        return note.toCustomJSON()
    }

    async updateNoteText(id: string, text: string) {
        const note = await this.noteRepository.findById(id)
        note.updateText(text)
        await this.noteRepository.save(note)
        return note.toCustomJSON()
    }

    async updateNoteCollab(id: string, collabNames: string[]) {
        let collabs: User[] = []
        const note = await this.noteRepository.findById(id)
        await Promise.all(collabNames.map(async (username) => {
            const userCollab = await this.userService.getOneOrCreate(username);
            if (userCollab.id === note.user.id) return;
            if (note.collaborators.find((collab) => collab.id === userCollab.id)) return;
            collabs.push(userCollab);
        }));
        note.addNewCollaborators(collabs)
        await this.noteRepository.save(note)
        return note.toCustomJSON()
    }

    async createNote({title, user}: {title: string, user: User}) {
        const note = new Note({
            title: title,
            user: user
        })
        await this.noteRepository.save(note)
        return note.toCustomJSON()
    }

    async getNoteUsers(id: string) {
        const note = await this.noteRepository.findByUser(id)
        return note.map(note => note.toCustomJSON())
    }

    async deleteNote(id: string, userId: string) {
        const note = await this.noteRepository.findById(id)
        if (note.user.id !== userId) {
            throw new UnauthorizedException('Você não é o dono dessa nota.')
        }
        await this.noteRepository.delete(note)
        return
    }
}