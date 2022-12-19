import { PageDto, PageMetaDto, PaginationDto, Testimonio } from '@lib/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestimonioDto } from './dto/create-testimonio.dto';
import { UpdateTestimonioDto } from './dto/update-testimonio.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TestimonioService {
  constructor(
    @InjectRepository(Testimonio)
    private _testimonioRepository: Repository<Testimonio>,
  ) {}

  async create(createTestimonioDto: CreateTestimonioDto) {
    const testimonio = await this._testimonioRepository.create({
      ...createTestimonioDto,
    });

    await this._testimonioRepository.save(testimonio);

    return testimonio;
  }

  async findAll(paginationDto: PaginationDto) {
    const queryBuilder =
      this._testimonioRepository.createQueryBuilder('testimonio');

    queryBuilder
      .where('testimonio.active = :active', { active: true })
      .orderBy('testimonio.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const testimonio = await this._testimonioRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!testimonio) throw new NotFoundException('El testimonio no existe');

    return testimonio;
  }

  async update(id: string, updateTestimonioDto: UpdateTestimonioDto) {
    const testimonio = await this._testimonioRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!testimonio) throw new NotFoundException('El testimonio no existe');

    const testimonioUpdate = Object.assign(testimonio, updateTestimonioDto);

    return await this._testimonioRepository.save(testimonioUpdate);
  }

  async remove(id: string) {
    const testimonio = await this._testimonioRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!testimonio) throw new NotFoundException('El testimonio no existe');

    return await this._testimonioRepository.update(id, { active: false });
  }
}
