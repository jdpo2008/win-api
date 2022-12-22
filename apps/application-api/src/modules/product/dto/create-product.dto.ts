/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  descripcion: string;

  @IsOptional()
  @IsString()
  createdBy?: string;
}
