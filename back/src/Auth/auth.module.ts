import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/User/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret_key',
            signOptions: { expiresIn: '1h' },
        }),
        UserModule
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
        JwtStrategy
    ],
    exports: [
        AuthService
    ]
})
export class AuthModule { }
