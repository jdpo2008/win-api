import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @IsString()
  @IsOptional()
  blogImage?: string;

  @IsString()
  @IsNotEmpty()
  blogCategoryId: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
