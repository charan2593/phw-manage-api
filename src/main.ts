import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out unknown fields
      forbidNonWhitelisted: true, // Throw error if extra fields are sent
      transform: false, // Auto-convert types (e.g., string to number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  console.log('Fastify server running at http://localhost:3000');
}
bootstrap();
