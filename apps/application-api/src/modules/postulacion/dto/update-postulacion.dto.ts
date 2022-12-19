/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreatePostulacionDto } from './create-postulacion.dto';

export class UpdatePostulacionDto extends PartialType(CreatePostulacionDto) {
  @IsOptional()
  @IsString()
  updateddBy: string;
}
