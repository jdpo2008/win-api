import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Feature } from '@lib/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), AuthModule],
  controllers: [FeatureController],
  providers: [FeatureService],
})
export class FeatureModule {}
