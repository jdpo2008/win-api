import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  descripcion: string;

  @IsOptional()
  @IsString()
  @MaxLength(25)
  icon: string;

  @IsOptional()
  @IsString()
  createdBy: string;
}
