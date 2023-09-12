import { User, UserProps } from "src/User/domain/user.entity"

export class UserMapper {
    static toDomain(raw: UserProps): User {
        const noteOrError = User.create(raw)
        return noteOrError
    }

    static toPersistence(user: User) {
        return user.toJSON()
    }
}