import { UniqueEntityId } from "../value-object/unique-entity-id.vo";

export abstract class Entity<T> {
    public uniqueEntityId: UniqueEntityId
    constructor(public readonly props: T, id?: UniqueEntityId) {
        this.uniqueEntityId = id ? id : new UniqueEntityId()
    }

    get id(): string {
        return this.uniqueEntityId.toString()
    }

    toJSON(): Required<{ id: string } & T> {
        return {
            id: this.id.toString(),
            ...this.props
        } as Required<{ id: string } & T>
    }
}