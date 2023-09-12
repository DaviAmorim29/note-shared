/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { AuthModule } from 'src/Auth/auth.module';
import { NoteRepository } from './infra/database/note-repository';
import { PrismaNoteRepository } from './infra/database/prisma/prisma.repository';
import { NoteController } from './infra/http/note.controller';
import { NoteGateway } from './infra/websocket/note.gateway';
import { NoteService } from './note.service';

@Module({
    imports: [AuthModule],
    controllers: [NoteController],
    providers: [
        NoteService,
        {
            provide: NoteRepository,
            useClass: PrismaNoteRepository
        },
        NoteGateway
    ],
})
export class NotesModule {}
