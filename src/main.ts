import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, *',
  });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: { target: false },
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(4000);
}
bootstrap();
