import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageDto, PageMetaDto, PaginationDto, Region } from '@lib/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private _regionRepository: Repository<Region>,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const region = await this._regionRepository.create({
      ...createRegionDto,
    });

    await this._regionRepository.save(region);

    return region;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._regionRepository.createQueryBuilder('region');

    queryBuilder
      .where('region.active = :active', { active: true })
      .orderBy('region.createdAt', paginationDto?.order)
      .skip(paginationDto?.skip)
      .take(paginationDto?.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const region = await this._regionRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!region) throw new NotFoundException('La region no existe en la BD');

    return region;
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    const region = await this._regionRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!region) throw new NotFoundException('Esta region no existe');
    const updateRegion = Object.assign(region, updateRegionDto);

    return await this._regionRepository.save(updateRegion);
  }

  async remove(id: string) {
    const region = await this._regionRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!region) throw new NotFoundException('La region no existe en la BD');

    return await this._regionRepository.update(id, { active: false });
  }
}
