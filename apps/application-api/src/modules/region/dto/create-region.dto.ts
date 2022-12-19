import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsNotEmpty()
  imagenUrl: string;

  @IsOptional()
  @IsString()
  createdBy: string;
}
