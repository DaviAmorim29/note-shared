import { Injectable } from "@nestjs/common";
import { User } from "src/User/domain/user.entity";
import { PrismaService } from "src/infra/database/prisma.service";
import { UserRepository } from "../user-repository";
import { UserMapper } from "./user-mapper";


@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private prismaService: PrismaService) {}

    async save(user: User): Promise<void> {
        const userData = user.toJSON()
        await this.prismaService.user.create({data: {
            createdAt: userData.createdAt,
            updatedAt: userData.updatedAt,
            id: userData.id,
            name: userData.name
        }})
    }

    async update(user: User): Promise<void> {
        const userData = user.toJSON()
        await this.prismaService.user.update({where: {id: userData.id}, data: userData})
    }

    async delete(user: User): Promise<void> {
        const userData = user.toJSON()
        await this.prismaService.user.delete({where: {id: userData.id}})
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirst({
            where: {
                name: username,
            }
        })
        if (!user) return null
        return UserMapper.toDomain(user, user.id)
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.prismaService.user.findFirstOrThrow({
            where: {
                id: id
            }
        })
        return UserMapper.toDomain(user, user.id)
    }
}