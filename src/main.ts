import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2')
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
    transform: true, // Convierte payloads en instancias de DTOs
    transformOptions: {
      enableImplicitConversion:true,
    }
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

