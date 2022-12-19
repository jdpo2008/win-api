import { Module } from '@nestjs/common';
import { InformacionService } from './informacion.service';
import { InformacionController } from './informacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Informacion, RmqModule } from '@lib/common';
import { NOTIFICATION_SERVICE } from '../../constants/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Informacion]),
    RmqModule.register({
      name: NOTIFICATION_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [InformacionController],
  providers: [InformacionService],
})
export class InformacionModule {}
