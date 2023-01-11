/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { BlogCategory, PageDto, PageMetaDto, PaginationDto } from '@lib/common';

@Injectable()
export class BlogCategoryService {
  constructor(
    @InjectRepository(BlogCategory)
    private _categoryRepository: Repository<BlogCategory>,
  ) {}

  async create(createBlogCategoryDto: CreateBlogCategoryDto) {
    await this._validateCategory(createBlogCategoryDto);

    const product = await this._categoryRepository.create({
      ...createBlogCategoryDto,
    });

    this._categoryRepository.save(product);

    return product;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder =
      this._categoryRepository.createQueryBuilder('blog-category');

    queryBuilder
      .innerJoinAndSelect('blog-category.blogs', 'blog')
      .where('blog-category.active = :active', { active: true })
      .orderBy('blog-category.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const category = await this._categoryRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!category) throw new NotFoundException('Esa categoria no existe');
    return category;
  }

  async update(id: string, updateBlogCategoryDto: UpdateBlogCategoryDto) {
    const category = await this._categoryRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!category) throw new NotFoundException('Este producto no existe');
    const updatedCategory = Object.assign(category, updateBlogCategoryDto);

    return await this._categoryRepository.save(updatedCategory);
  }

  async remove(id: string) {
    const category = await this._categoryRepository.findOneBy({ id: id });
    if (!category) throw new NotFoundException('Esa categoria no existe');

    await this._categoryRepository.update(id, { active: false });
  }

  private async _validateCategory(request: CreateBlogCategoryDto) {
    let category: BlogCategory;
    try {
      category = await this._categoryRepository.findOneBy({
        nombre: request.nombre,
      });
    } catch (err) {}

    if (category) {
      throw new UnprocessableEntityException('Blog Category already exists.');
    }
  }
}
