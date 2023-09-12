import { UniqueEntityId } from "src/@seed/value-object/unique-entity-id.vo"
import { User, UserProps } from "src/User/domain/user.entity"

export class UserMapper {
    static toDomain(raw: UserProps, id: string): User {
        const noteOrError = User.create(raw, id ? new UniqueEntityId(id) : undefined)
        return noteOrError
    }

    static toPersistence(user: User) {
        return user.toJSON()
    }
}