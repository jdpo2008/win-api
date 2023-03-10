import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Banner } from '@lib/common';

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), AuthModule],
  controllers: [BannerController],
  providers: [BannerService],
})
export class BannerModule {}
