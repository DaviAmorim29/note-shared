/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/@seed/value-object/unique-entity-id.vo';
import { Note } from 'src/Note/domain/note.entity';
import { PrismaService } from 'src/infra/database/prisma.service';
import { NoteMapper } from '../note-mapper';
import { NoteRepository } from '../note-repository';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
    constructor(private prismaService: PrismaService) {}
    async save(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
        await this.prismaService.note.upsert({where: {
            id: noteData.id,
        }, update: {
            body: noteData.text,
            collaborators: {
                connect: noteData.collaborators.map(collaborator => ({id: collaborator.toString()}))
            },
        }, create: {
            id: noteData.id,
            title: noteData.title,
            authorId: noteData.userId.toString(),
            body: noteData.text,
            collaborators: {},
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
        }})
    }
    async delete(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
        await this.prismaService.note.delete({where: {id: noteData.id}})
    }
    async updateText(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
        console.log({noteData})
        await this.prismaService.note.update({where: {id: noteData.id}, data: {
            body: noteData.text,
        }})
    }
    async findById(id: string): Promise<Note> {
        const noteData = await this.prismaService.note.findFirstOrThrow({where: {id: id}, include: {author: true, collaborators: true}})
        return NoteMapper.toDomain({
            title: noteData.title,
            userId: new UniqueEntityId(noteData.authorId),
            collaborators: noteData.collaborators.map(collaborator => new UniqueEntityId(collaborator.id)),
            text: noteData.body,
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
        })
    }

    async findByAuthor(id: string): Promise<Note[]> {
        const notesData = await this.prismaService.note.findMany({where: {authorId: id}, include: {author: true, collaborators: true}})
        console.log({notesData})
        const notesReturn = notesData.map(noteData => NoteMapper.toDomain({
            title: noteData.title,
            userId: new UniqueEntityId(noteData.authorId),
            collaborators: noteData.collaborators.map(collaborator => new UniqueEntityId(collaborator.id)),
            text: noteData.body,
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
        }, noteData.id))
        // console.log({notesReturn})
        return notesReturn
    }
}
