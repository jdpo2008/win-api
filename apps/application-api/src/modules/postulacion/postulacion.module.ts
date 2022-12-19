import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Postulation, RmqModule } from '@lib/common';
import { PostulacionController } from './postulacion.controller';
import { PostulacionService } from './postulacion.service';
import { NOTIFICATION_SERVICE } from '../../constants/services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Postulation]),
    RmqModule.register({
      name: NOTIFICATION_SERVICE,
    }),
    AuthModule,
  ],
  controllers: [PostulacionController],
  providers: [PostulacionService],
  exports: [PostulacionService, RmqModule],
})
export class PostulacionModule {}
