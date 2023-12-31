/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from 'src/Note/note.service';
import { User } from 'src/User/domain/user.entity';



@Controller('note')
export class NoteController {
    constructor(
        private noteService: NoteService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Request() req, @Body('title') title: string) {
        const user = req.user as User
        return this.noteService.createNote({
            title,
            user
        })
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async get(@Request() req) {
        const user = req.user as User
        return this.noteService.getNoteUsers(user.id)
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(':id/text')
    async update(@Param('id') id: string, @Body('text') text: string) {
        return this.noteService.updateNoteText(id, text)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id/collab')
    async updateCollab(@Param('id') id: string, @Body('collabs') collabs: string[]) {
        return this.noteService.updateNoteCollab(id, collabs)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: string, @Request() req) {
        const user = req.user as User
        return this.noteService.deleteNote(id, user.id)
    }
}
