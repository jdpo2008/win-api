import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExternalApiModule } from './external-api.module';
import { ResponseInterceptor } from '@lib/common';

async function bootstrap() {
  const app = await NestFactory.create(ExternalApiModule);
  app.enableCors({ origin: '*' });
  const moduleRef = app.select(ExternalApiModule);
  const reflector = moduleRef.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
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
