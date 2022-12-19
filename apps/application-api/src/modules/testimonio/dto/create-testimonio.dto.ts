import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateTestimonioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @IsObject()
  @IsNotEmpty()
  job: any;

  @IsOptional()
  @IsString()
  createdBy: string;
}
