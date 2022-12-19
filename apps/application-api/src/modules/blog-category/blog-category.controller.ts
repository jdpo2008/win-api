/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { JwtAuthGuard, PaginationDto } from '@lib/common';
import { BlogCategoryService } from './blog-category.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';

@Controller('blog-category')
export class BlogCategoryController {
  constructor(private readonly blogCategoryService: BlogCategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createBlogCategoryDto: CreateBlogCategoryDto,
    @Req() req: any,
  ) {
    return this.blogCategoryService.create({
      ...createBlogCategoryDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.blogCategoryService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogCategoryService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBlogCategoryDto: UpdateBlogCategoryDto,
    @Req() req: any,
  ) {
    return this.blogCategoryService.update(id, {
      ...updateBlogCategoryDto,
      updatedBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogCategoryService.remove(id);
  }
}
