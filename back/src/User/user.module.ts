/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaUserRepository } from './infra/database/repositories/prisma-repository';
import { UserRepository } from './infra/database/user-repository';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        {
            provide: UserRepository,
            useClass: PrismaUserRepository
        },
        UserService
    ],
    exports: [
        UserService
    ]
})
export class UserModule {}
