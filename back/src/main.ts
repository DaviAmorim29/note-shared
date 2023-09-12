import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  app.useGlobalFilters(new NotFoundExceptionFilter());
  await app.listen(3001);
}
bootstrap();
