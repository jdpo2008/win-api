import { JwtAuthGuard, RmqService } from '@lib/common';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  Payload,
  RmqContext,
  MessagePattern,
} from '@nestjs/microservices';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { PostulacionService } from './postulacion.service';

@Controller('postulacion')
export class PostulacionController {
  constructor(
    private readonly postulacionApiService: PostulacionService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern({ cmd: 'postulacion_get' })
  //@UseGuards(JwtAuthGuard)
  async handleUserCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    console.log(data);
    return await this.postulacionApiService.getHello();
  }

  @Post()
  //@UseGuards(JwtAuthGuard)
  async create(@Body() postulacionDto: CreatePostulacionDto, @Req() req: any) {
    return this.postulacionApiService.create({
      ...postulacionDto,
      createdBy: req?.user?.id,
    });
  }
}
