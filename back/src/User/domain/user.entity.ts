import { Entity } from "src/@seed/entity/entity";
import { UniqueEntityId } from "src/@seed/value-object/unique-entity-id.vo";

export interface UserProps {
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export class User extends Entity<UserProps> {
    constructor(props: UserProps, id?: UniqueEntityId) {
        User.Validate(props)
        super(props, id)
        this.name = props.name
        this.props.createdAt = props.createdAt || new Date()
        this.updatedAt = props.updatedAt || new Date()
    }

    static Validate(props: UserProps) {
        if (!props.name) {
            throw new Error('User name is required')
        }
    }

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    set updatedAt(date: Date) {
        this.props.updatedAt = date
    }

    update(name: string) {
        this.name = name
        this.updatedAt = new Date()
    }

    static create(userProps: UserProps, id?: UniqueEntityId) {
        return new User(userProps, id)
    }
}