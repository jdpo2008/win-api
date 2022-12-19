import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateEquipoDto } from './create-equipo.dto';

export class UpdateEquipoDto extends PartialType(CreateEquipoDto) {
  @IsOptional()
  @IsString()
  updateddBy: string;
}
