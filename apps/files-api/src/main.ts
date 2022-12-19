import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { ResponseInterceptor } from '@lib/common';
import { FilesApiModule } from './files-api.module';

async function bootstrap() {
  const app = await NestFactory.create(FilesApiModule);
  app.enableCors({ origin: '*' });
  const moduleRef = app.select(FilesApiModule);
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
