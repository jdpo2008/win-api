import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsOptional()
  @IsString()
  createdBy: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;

  @IsOptional()
  @IsString()
  imagenUrl: string;
}
