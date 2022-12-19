import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Job } from '@lib/common';
import { EmpleoService } from './empleo.service';
import { EmpleoController } from './empleo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), AuthModule],
  controllers: [EmpleoController],
  providers: [EmpleoService],
})
export class EmpleoModule {}
