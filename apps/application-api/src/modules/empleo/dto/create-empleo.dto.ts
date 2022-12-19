import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEmpleoDto {
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
