import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog, PageDto, PageMetaDto, PaginationDto } from '@lib/common';
import { Repository } from 'typeorm';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private readonly _blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = await this._blogRepository.create(createBlogDto);

    await this._blogRepository.save(blog);

    return blog;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._blogRepository.createQueryBuilder('blog');

    queryBuilder
      .innerJoinAndSelect('blog.blog_category', 'blog_category')
      .where('blog.active = :active', { active: true })
      .orderBy('blog.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const blog = await this._blogRepository.findOneBy({ id: id, active: true });

    if (!blog) {
      throw new NotFoundException('Blog not exists');
    }

    await this._blogRepository.update(id, { views: blog.views++ });

    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    const blog = await this._blogRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!blog) throw new NotFoundException('Ese blog no existe');
    const updatedBlog = Object.assign(blog, updateBlogDto);

    return await this._blogRepository.save(updatedBlog);
  }

  async remove(id: string) {
    const blog = await this._blogRepository.findOneBy({ id: id });
    if (!blog) throw new NotFoundException('Esa categoria no existe');

    await this._blogRepository.update(id, { active: false });
  }
}
