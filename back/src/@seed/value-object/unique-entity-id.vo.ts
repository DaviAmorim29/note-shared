import { v4, validate } from 'uuid';
import { ValueObject } from "./value-object";

export class InvalidUUIDError extends Error {
    constructor(msg?: string) {
        super(msg ? msg : 'Invalid UUID');
        this.name = 'InvalidUUIDError';
    }
}

export class UniqueEntityId extends ValueObject<string> {
    constructor(id?: string) {
        super(id ? id : v4());
        this.validate()   
    }
    static create(id) {
        return new UniqueEntityId(id);
    }

    private validate() {
        const valid = validate(this.value)
        if (!valid) {
            throw new InvalidUUIDError()
        }
    }
}