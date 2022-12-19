import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Equipo } from '@lib/common';

@Module({
  imports: [TypeOrmModule.forFeature([Equipo]), AuthModule],
  controllers: [EquipoController],
  providers: [EquipoService],
})
export class EquipoModule {}
