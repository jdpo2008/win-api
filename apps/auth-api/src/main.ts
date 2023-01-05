/* eslint-disable prettier/prettier */
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ResponseInterceptor } from '@lib/common';
import { AuthApiModule } from './auth-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthApiModule);
  app.enableCors({ origin: '*' });

  const moduleRef = app.select(AuthApiModule);
  const reflector = moduleRef.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}
bootstrap();
