import { Module } from '@nestjs/common';
import { BlogCategoryService } from './blog-category.service';
import { BlogCategoryController } from './blog-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, BlogCategory } from '@lib/common';

@Module({
  imports: [TypeOrmModule.forFeature([BlogCategory]), AuthModule],
  controllers: [BlogCategoryController],
  providers: [BlogCategoryService],
})
export class BlogCategoryModule {}
