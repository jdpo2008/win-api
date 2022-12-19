import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTipoDocumentoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  @IsString()
  createdBy: string;
}
