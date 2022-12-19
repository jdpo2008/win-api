import { Controller, Get, UseGuards, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@lib/common';
import { NotificationApiService } from './notification-api.service';

@Controller()
export class NotificationApiController {
  private readonly _logger = new Logger(NotificationApiController.name);
  constructor(
    private readonly notificationApiService: NotificationApiService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationApiService.getHello();
  }

  @EventPattern('user_created')
  //@UseGuards(JwtAuthGuard)
  async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.notificationApiService.sendUserNotification(data);
    this.rmqService.ack(context);
  }

  @EventPattern('postulacion_created')
  //@UseGuards(JwtAuthGuard)
  async handlePostulacionCreated(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    await this.notificationApiService.sendPostulacionNotification(data);
    this.rmqService.ack(context);
  }

  @EventPattern('informacion_created')
  //@UseGuards(JwtAuthGuard)
  async handleInformacionCreated(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    await this.notificationApiService.sendInformacionNotification(data);
    this.rmqService.ack(context);
  }
}
