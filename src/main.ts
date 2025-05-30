import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  const PORT = configService.get<number>('PORT') || 3000;
  logger.log(`PORT :: ${PORT}`);

  await app.listen(PORT);
}
bootstrap();
