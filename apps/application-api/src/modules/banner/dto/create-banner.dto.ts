import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  seccion: number;

  @IsString()
  @IsNotEmpty()
  imagenUrl?: string;

  @IsNumber()
  @IsPositive()
  orden: number;

  @IsOptional()
  @IsString()
  createdBy: string;
}
