import { Injectable } from '@nestjs/common';
import { UniqueEntityId } from 'src/@seed/value-object/unique-entity-id.vo';
import { Note } from 'src/Note/domain/note.entity';
import { User } from 'src/User/domain/user.entity';
import { PrismaService } from 'src/infra/database/prisma.service';
import { NoteMapper } from '../note-mapper';
import { NoteRepository } from '../note-repository';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
    constructor(private prismaService: PrismaService) { }
    async save(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note);
        await this.prismaService.note.upsert({
            where: { id: noteData.id },
            update: {
                title: noteData.title,
                body: noteData.text,
                updatedAt: noteData.updatedAt,
                collaborators: {}
            },
            create: {
                id: noteData.id,
                title: noteData.title,
                authorId: noteData.user.id,
                body: noteData.text,
                createdAt: noteData.createdAt,
                updatedAt: noteData.updatedAt
            }
        });
        for (const collab of noteData.collabs) {
            await this.prismaService.userNoteCollaborator.upsert({
                where: {
                    noteId_userId: {
                        noteId: noteData.id,
                        userId: collab.id
                    }
                },
                update: {},
                create: {
                    id: new UniqueEntityId().toString(),
                    note: {
                        connect: {
                            id: noteData.id
                        }
                    },
                    user: {
                        connect: {
                            name: collab.name
                        }
                    }
                }
            })
        }

        // for (const collaboratorName of noteData.collabs) {
        //     await this.prismaService.userNoteCollaborator.upsert({
        //         where: {
        //             noteId_userId: {
        //                 noteId: noteData.id,
        //                 userId: collaboratorName.username
        //             }
        //         },
        //         update: {},
        //         create: {
        //             id: new UniqueEntityId().toString(),
        //             note: {
        //                 connect: {
        //                     id: noteData.id
        //                 }
        //             },
        //             user: {
        //                 connect: {
        //                     name: collaboratorName.username
        //                 }
        //             }
        //         }
        //     });
        // }

        // 4. Retorne a nota criada/atualizada com os colaboradores
        return
    }
    async delete(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
        await this.prismaService.note.delete({ where: { id: noteData.id }, include: { collaborators: true } })
    }
    async updateText(note: Note): Promise<void> {
        const noteData = NoteMapper.toPersistence(note)
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
            user: User.create(noteData.author, new UniqueEntityId(noteData.authorId)),
            collaborators: noteData.collaborators.map(collaborator => User.create(collaborator.user, new UniqueEntityId(collaborator.user.id))),
            text: noteData.body,
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
        }, noteData.id)
    }

    async findByUser(id: string): Promise<Note[]> {
        const notesData = await this.prismaService.note.findMany({
          where: {
            OR: [
              { authorId: id }, // Verifica se o userId é igual ao authorId
              {
                collaborators: {
                  some: {
                    userId: id, // Verifica se o userId existe na relação UserNoteCollaborator
                  },
                },
              },
            ],
          },
          include: {
            author: true,
            collaborators: {
              include: {
                user: true,
              },
            },
          },
        });
      
        const notesReturn = notesData.map((noteData) =>
          NoteMapper.toDomain({
            title: noteData.title,
            user: User.create(noteData.author, new UniqueEntityId(noteData.authorId)),
            collaborators: noteData.collaborators.map((collaborator) =>
              User.create(
                collaborator.user,
                new UniqueEntityId(collaborator.user.id)
              )
            ),
            text: noteData.body,
            createdAt: noteData.createdAt,
            updatedAt: noteData.updatedAt,
          }, noteData.id)
        );
        
        return notesReturn;
      }
}
