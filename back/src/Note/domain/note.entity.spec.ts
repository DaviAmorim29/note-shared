// make a test for all note domain entity

import { User } from "src/User/domain/user.entity";
import { Note } from "./note.entity";

describe('Note Entity', () => {
    let mainUser: User
    beforeEach(() => {
        mainUser = User.create({
            name: 'amorim'
        })
    })
    it('should be create', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        expect(note).toBeDefined()
    });

    it('should be update', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        note.updateTitle('New Title')
        expect(note.title).toBe('New Title')
    })

    it('should be update text', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        note.updateText('New Text')
        expect(note.text).toBe('New Text')
    })

    it('should be update collaborators', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        const newUser = User.create({ name: 'test' })
        note.addNewCollaborators([newUser])
        expect(note.collaborators).toHaveLength(1)
        expect(note.collaborators).toEqual([
            newUser
        ])
    })

    it('should be remove collaborators', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        const newUser = User.create({ name: 'test' })
        note.addNewCollaborators([newUser])
        note.removeCollaborator(newUser)
        expect(note.collaborators).toHaveLength(0)
    })

    it('should be create created_at', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        expect(note.createdAt).toBeDefined()
    })

    it('should be create updated_at', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        expect(note.updatedAt).toBeDefined()
    })

    it('should be update updated_at', () => {
        const note = new Note({
            title: 'Title',
            user: mainUser
        })
        const oldDate = note.updatedAt
        const collab = User.create({ name: 'test' })
        note.addNewCollaborators([collab])
        expect(note.updatedAt).not.toBe(oldDate)
    })
})