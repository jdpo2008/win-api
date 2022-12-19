import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogCategoryDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
