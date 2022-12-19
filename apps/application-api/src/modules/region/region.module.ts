import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Region } from '@lib/common';

@Module({
  imports: [TypeOrmModule.forFeature([Region]), AuthModule],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionModule {}
