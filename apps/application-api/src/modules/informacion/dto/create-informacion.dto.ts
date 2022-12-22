/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInformacionDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  celular: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsNotEmpty()
  provincia: string;

  @IsString()
  @IsNotEmpty()
  distrito: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsOptional()
  createdBy?: string;
}
