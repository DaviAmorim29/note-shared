/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
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
        const user = req.user 
        return this.noteService.createNote({
            title,
            user: user
        })
    }

    @UseGuards(AuthGuard("jwt"))
    @Get()
    async get(@Request() req) {
        const user = req.user as User
        const note = await this.noteService.getNoteUsers({userId: user.id.toString()})
        const noteJson = note.map(note => note.toCustomJSON())
        return noteJson
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(':id/text')
    async update(@Param('id') id: string, @Body('text') text: string) {
        return this.noteService.updateNoteText(id, text)
    }
}
