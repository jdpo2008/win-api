import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Service } from '@lib/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Service]), AuthModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
