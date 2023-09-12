import { User, UserProps } from "src/User/domain/user.entity";
import { Entity } from "../../@seed/entity/entity";
import { UniqueEntityId } from "../../@seed/value-object/unique-entity-id.vo";

export interface NoteProps {
    title: string
    user: User
    text?: string
    collaborators?: User[]
    createdAt?: Date
    updatedAt?: Date
}

// type CollabType = Required<CollabProps> & { id: string }
type UserType = Required<UserProps> & { id: string }

export class Note extends Entity<NoteProps> {
    constructor(props: NoteProps, id?: UniqueEntityId) {
        Note.Validate(props)
        super(props, id)
        this.title = props.title
        this.text = props.text || ''
        this.props.collaborators = props.collaborators || []
        this.props.createdAt = props.createdAt || new Date()
        this.updatedAt = props.updatedAt || new Date()
    }

    static Validate(props: NoteProps) {
        if (!props.title) {
            throw new Error('Note title is required')
        }
        if (!props.user) {
            throw new Error('Note User is required')
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

    get user() {
        return this.props.user
    }

    set user(userId: User) {
        this.props.user = userId
    }

    get collaborators() {
        return this.props.collaborators
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

    addNewCollaborators(users: User[]) {
        users.forEach((collab) => {
            this.props.collaborators.push(collab)
        })
        this.updateUpdatedAt()
    }
    removeCollaborator(userCollab: User) {
        this.props.collaborators = this.collaborators.filter(collaborator => collaborator.id !== userCollab.id)
        this.updateUpdatedAt()
    }

    toCustomJSON(): Required<Omit<Omit<NoteProps, 'user'>, 'collaborators'> & { id: string ;collabs: UserType[]; user: UserType}> {
        // const collabs: CollabType[] = this.collaborators.map(collaborator => collaborator.toJSON())
        const collabs: UserType[] = this.collaborators.map(user => {
            return user.toJSON()
        })
        return {
            id: this.id.toString(),
            title: this.title,
            user: this.user.toJSON(),
            collabs,
            text: this.text,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        }
    }
}