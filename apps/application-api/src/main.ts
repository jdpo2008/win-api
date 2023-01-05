/* eslint-disable prettier/prettier */
import { ResponseInterceptor } from '@lib/common';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ApplicationApiModule } from './application-api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationApiModule);
  app.enableCors({ origin: '*' });

  const moduleRef = app.select(ApplicationApiModule);
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
