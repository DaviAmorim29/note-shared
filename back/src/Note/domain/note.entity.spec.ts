// make a test for all note domain entity

import { UniqueEntityId } from "../../@seed/value-object/unique-entity-id.vo";
import { Note } from "./note.entity";

describe('Note Entity', () => {
    it('should be create', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        expect(note).toBeDefined()
    });

    it('should be update', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        note.updateTitle('New Title')
        expect(note.title).toBe('New Title')
    })

    it('should be update text', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        note.updateText('New Text')
        expect(note.text).toBe('New Text')
    })

    it('should be update collaborators', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        const newUser = new UniqueEntityId()
        note.addNewCollaborator(newUser)
        expect(note.collaborators).toHaveLength(1)
        expect(note.collaborators).toEqual([
            newUser
        ])
    })

    it('should be remove collaborators', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        const newUser = new UniqueEntityId()
        note.addNewCollaborator(newUser)
        note.removeCollaborator(newUser)
        expect(note.collaborators).toHaveLength(0)
    })

    it('should be create created_at', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        expect(note.createdAt).toBeDefined()
    })

    it('should be create updated_at', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        expect(note.updatedAt).toBeDefined()
    })

    it('should be update updated_at', () => {
        const note = new Note({
            title: 'Title',
            userId: new UniqueEntityId()
        })
        const oldDate = note.updatedAt
        note.addNewCollaborator(new UniqueEntityId())
        expect(note.updatedAt).not.toBe(oldDate)
    })
})