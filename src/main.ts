import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

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

  const config = new DocumentBuilder()
    .setTitle('Pure Home Waters API')
    .setDescription('API documentation for Pure Home Waters Customer Management System')
    .setVersion('1.0')
    .addTag('customers')
    .addTag('payments')
    .addTag('service-reminders')
    .build();

  // Only enable Swagger in development/staging
  if (process.env.NODE_ENV !== 'production') {
    // Swagger setup code
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('', app, document, {
      jsonDocumentUrl: 'json', // optional: serve raw OpenAPI JSON
    });
  }

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log('Fastify server running at http://localhost:3000');
}
bootstrap();
