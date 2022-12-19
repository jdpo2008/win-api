import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { ResponseInterceptor, RmqService } from '@lib/common';
import { AuthApiModule } from './auth-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthApiModule);
  //const rmqService = app.get<RmqService>(RmqService);
  app.enableCors({ origin: '*' });

  const moduleRef = app.select(AuthApiModule);
  const reflector = moduleRef.get(Reflector);

  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  // app.connectMicroservice<RmqOptions>(rmqService.getOptions('AUTH', true));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  //await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
