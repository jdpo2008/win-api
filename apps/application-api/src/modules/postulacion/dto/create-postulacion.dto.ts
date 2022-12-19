/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePostulacionDto {
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsString()
  @IsNotEmpty()
  documento: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  experiencia: string;

  @IsObject()
  @IsOptional()
  job: any;

  @IsObject()
  @IsOptional()
  tipo_documento: any;

  @IsOptional()
  @IsString()
  createdBy: string;
}
