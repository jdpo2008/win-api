import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBlogCategoryDto } from './create-blog-category.dto';

export class UpdateBlogCategoryDto extends PartialType(CreateBlogCategoryDto) {
  @IsString()
  @IsNotEmpty()
  updatedBy: string;
}
