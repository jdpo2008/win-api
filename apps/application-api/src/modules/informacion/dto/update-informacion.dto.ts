import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateInformacionDto } from './create-informacion.dto';

export class UpdateInformacionDto extends PartialType(CreateInformacionDto) {
  @IsOptional()
  @IsString()
  updatedBy: string;
}
