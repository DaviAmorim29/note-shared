import { Global, Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { NotesModule } from './Note/note.module';
import { UserModule } from './User/user.module';
import { PrismaService } from './infra/database/prisma.service';

@Global()
@Module({
  imports: [
    AuthModule,
    NotesModule,
    UserModule],
  controllers: [],
  providers: [
    PrismaService,],
  exports: [
    PrismaService
  ]
})
export class AppModule { }
