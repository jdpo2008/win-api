import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { RmqService } from '@lib/common';
import { NotificationApiModule } from './notification-api.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationApiModule, {
    logger: ['log', 'debug', 'error', 'warn'],
  });
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('NOTIFICATION'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useLogger(new Logger());

  //await app.listen(3000);
  await app.startAllMicroservices();
}
bootstrap();
