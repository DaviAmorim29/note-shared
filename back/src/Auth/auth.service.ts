// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/User/domain/user.entity';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async login(username: string): Promise<{ user: User['props'],token: string }> {
        const user = await this.userService.getOneOrCreate(username);
        console.log({user})
        const payload = { username: user.name, sub: user.id };
        console.log({payload})
        const token = this.jwtService.sign(payload);
        console.log({token})
    
        const userJson = user.toJSON();

        return { user: userJson,token };
    }

    async validateUser(id: string): Promise<User | null> {
        const user = await this.userService.find(id);
        return user;
    }
}
