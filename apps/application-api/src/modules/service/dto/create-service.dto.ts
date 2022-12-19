import { Feature } from '@lib/common';
import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  descripcion?: string;

  @IsDecimal()
  @IsPositive()
  @Min(1)
  precio: number;

  @IsNotEmpty()
  @IsString()
  velocidad_actual: string;

  @IsOptional()
  @IsString()
  velocidad_anterior?: string;

  @IsOptional()
  @IsBoolean()
  tiene_promocion?: boolean;

  @IsOptional()
  @IsString()
  promocion?: string;

  @IsUUID()
  @IsNotEmpty()
  productoId: string;

  @IsArray()
  @IsNotEmpty()
  features: Feature[];

  @IsOptional()
  @IsString()
  createdBy: string;
}
