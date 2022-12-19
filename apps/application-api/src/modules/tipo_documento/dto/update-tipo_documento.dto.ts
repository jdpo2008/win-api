import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDocumentoDto } from './create-tipo_documento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTipoDocumentoDto extends PartialType(
  CreateTipoDocumentoDto,
) {
  @IsOptional()
  @IsString()
  updateddBy: string;
}
