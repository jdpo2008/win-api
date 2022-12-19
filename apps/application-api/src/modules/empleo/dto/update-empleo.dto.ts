import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateEmpleoDto } from './create-empleo.dto';

export class UpdateEmpleoDto extends PartialType(CreateEmpleoDto) {
  @IsOptional()
  @IsString()
  updateddBy: string;
}
