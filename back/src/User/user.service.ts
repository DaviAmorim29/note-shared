import { Injectable } from "@nestjs/common";
import { User } from "./domain/user.entity";
import { UserRepository } from "./infra/database/user-repository";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    async getOneOrCreate(username: string): Promise<User> {
        const user = await this.userRepository.findByUsername(username)
        if (!user) {
            const user = new User({
                name: username
            })
            await this.userRepository.save(user)
            return user
        }
        return user
    }

    async find(id: string): Promise<User> {
        const user = await this.userRepository.findById(id)
        return user
    }

    async getUserByUsername(name: string) {
        const user = await this.userRepository.findByUsername(name)
        if (!user) {
            return null
        }
        return user
    }

}