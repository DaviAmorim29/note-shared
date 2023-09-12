import { User } from "src/User/domain/user.entity";

export abstract class UserRepository {
    abstract save(user: User): Promise<void>

    abstract update(user: User): Promise<void>

    abstract delete(user: User): Promise<void>

    abstract findByUsername(username: string): Promise<User | null>

    abstract findById(id: string): Promise<User | null>
}