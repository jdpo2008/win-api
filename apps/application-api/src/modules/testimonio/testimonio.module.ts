import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Testimonio } from '@lib/common';
import { TestimonioService } from './testimonio.service';
import { TestimonioController } from './testimonio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Testimonio]), AuthModule],
  controllers: [TestimonioController],
  providers: [TestimonioService],
})
export class TestimonioModule {}
