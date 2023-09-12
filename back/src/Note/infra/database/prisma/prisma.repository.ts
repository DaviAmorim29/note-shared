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
    constructor(private prismaService: PrismaService) { }
    async save(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note);

        // 1. Verifique e crie usuários
        for (const collaboratorName of noteData.collaborators) {
            await this.prismaService.user.upsert({
                where: { name: collaboratorName },
                update: {}, // Não atualize nada se o usuário já existir
                create: { id: new UniqueEntityId().toString() ,name: collaboratorName, createdAt: new Date(), updatedAt: new Date() }
            });
        }

        // 2. Upsert Note
        await this.prismaService.note.upsert({
            where: { id: noteData.id },
            update: {
                title: noteData.title,
                body: noteData.text,
                updatedAt: noteData.updatedAt
            },
            create: {
                id: noteData.id,
                title: noteData.title,
                authorId: noteData.userId.toString(),
                body: noteData.text,
                createdAt: noteData.createdAt,
                updatedAt: noteData.updatedAt
            }
        });

        // 3. Gerencie Collaborators
        for (const collaboratorName of noteData.collaborators) {
            await this.prismaService.userNoteCollaborator.upsert({
                where: {
                    noteId_userId: {
                        noteId: noteData.id,
                        userId: collaboratorName // Assumindo que o nome do colaborador é único e pode ser usado como ID
                    }
                },
                update: {}, // Não atualize nada se a relação já existir
                create: {
                    id: new UniqueEntityId().toString(),
                    note: {
                        connect: {
                            id: noteData.id
                        }
                    },
                    user: {
                        connect: {
                            name: collaboratorName
                        }
                    }
                }
            });
        }

        // 4. Retorne a nota criada/atualizada com os colaboradores
        return
    }
    async delete(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
        await this.prismaService.note.delete({ where: { id: noteData.id } })
    }
    async updateText(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
        console.log({ noteData })
        await this.prismaService.note.update({
            where: { id: noteData.id }, data: {
                body: noteData.text,
            }
        })
    }
    async findById(id: string): Promise<Note> {
        const noteData = await this.prismaService.note.findFirstOrThrow({
            where: { id: id }, include: {
                author: true, collaborators: {
                    include: {
                        user: true
                    }
                }
            }
        })
        return NoteMapper.toDomain({
            title: noteData.title,
            userId: new UniqueEntityId(noteData.authorId),
            collaborators: noteData.collaborators.map(collaborator => collaborator.user.name),
            text: noteData.body,
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
        }, noteData.id)
    }

    async findByAuthor(id: string): Promise<Note[]> {
        const notesData = await this.prismaService.note.findMany({
            where: { authorId: id }, include: {
                author: true, collaborators: {
                    include: {
                        user: true
                    }
                }
            }
        })
        // console.log({notesData})
        const notesReturn = notesData.map(noteData => NoteMapper.toDomain({
            title: noteData.title,
            userId: new UniqueEntityId(noteData.authorId),
            collaborators: noteData.collaborators.map(collaborator => collaborator.user.name),
            text: noteData.body,
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
        }, noteData.id))
        // console.log({notesReturn})
        return notesReturn
    }
}
