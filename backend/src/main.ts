import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const defaultOrigins = ['http://localhost:3000'];
  const configuredOrigins = (process.env.CORS_ORIGIN ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: configuredOrigins.length > 0 ? configuredOrigins : defaultOrigins,
  });

  await app.listen(process.env.PORT ?? 3001);
}

await bootstrap();