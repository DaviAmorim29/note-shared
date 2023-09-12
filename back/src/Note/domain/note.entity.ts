import { Replace } from "src/@seed/utils";
import { Entity } from "../../@seed/entity/entity";
import { UniqueEntityId } from "../../@seed/value-object/unique-entity-id.vo";

export interface NoteProps {
    title: string
    userId: UniqueEntityId
    text?: string
    collaborators?: UniqueEntityId[]
    createdAt?: Date
    updatedAt?: Date
}

export class Note extends Entity<NoteProps> {
    constructor(props: NoteProps, id?: UniqueEntityId) {
        Note.Validate(props)
        super(props, id)
        this.title = props.title
        this.text = props.text || ''
        this.collaborators = props.collaborators || []
        this.props.createdAt = props.createdAt || new Date()
        this.updatedAt = props.updatedAt || new Date()
    }

    static Validate(props: NoteProps) {
        if (!props.title) {
            throw new Error('Note title is required')
        }
        if (!props.userId) {
            throw new Error('Note userId is required')
        }
    }

    static create(props: NoteProps, id?: UniqueEntityId) {
        return new Note(props, id)
    }

    get title() {
        return this.props.title
    }

    set title(title: string) {
        this.props.title = title
    }

    get text() {
        return this.props.text
    }

    set text(text: string) {
        this.props.text = text
    }

    get userId() {
        return this.props.userId
    }

    set userId(userId: UniqueEntityId) {
        this.props.userId = userId
    }

    get collaborators() {
        return this.props.collaborators
    }

    set collaborators(collaborators: UniqueEntityId[]) {
        this.props.collaborators = collaborators
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt
    }

    updateUpdatedAt() {
        this.updatedAt = new Date()
    }

    updateTitle(text: string) {
        this.title = text
        this.updateUpdatedAt()
    }

    updateText(text: string) {
        this.text = text
        this.updateUpdatedAt()
    }

    addNewCollaborator(collaboratorId: UniqueEntityId) {
        this.collaborators.push(collaboratorId)
        this.updateUpdatedAt()
    }
    removeCollaborator(collaboratorId: UniqueEntityId) {
        this.collaborators = this.collaborators.filter(collaborator => collaborator.toString() !== collaboratorId.toString())
        this.updateUpdatedAt()
    }

    toCustomJSON(): Required<{ id: string; } & Replace<NoteProps, 'userId', string>> {
        return {
            id: this.id.toString(),
            title: this.title,
            userId: this.userId.toString(),
            collaborators: this.collaborators,
            text: this.text,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        } as Required<{ id: string; } & Replace<NoteProps, 'userId', string>>
    }
}