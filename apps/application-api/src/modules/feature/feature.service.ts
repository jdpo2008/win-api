import { Feature, PageDto, PageMetaDto, PaginationDto } from '@lib/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private _featureRepository: Repository<Feature>,
  ) {}

  async create(createFeatureDto: CreateFeatureDto) {
    const feature = await this._featureRepository.create({
      ...createFeatureDto,
    });
    this._featureRepository.save(feature);
    return feature;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._featureRepository.createQueryBuilder('f');

    queryBuilder
      .where('f.active = :active', { active: true })
      .orderBy('f.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Feature> {
    const feature = await this._featureRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!feature) throw new NotFoundException('Esta caracteristica no existe');
    return feature;
  }

  async update(id: string, updateFeatureDto: UpdateFeatureDto) {
    const feature = await this._featureRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!feature) throw new NotFoundException('Esta caracteristica no existe');
    const updatedfeature = Object.assign(feature, updateFeatureDto);

    return await this._featureRepository.save(updatedfeature);
  }

  async remove(id: string) {
    const feature = await this._featureRepository.findOneBy({ id: id });
    if (!feature) throw new NotFoundException('Este perfil no existe');

    await this._featureRepository.update(id, { active: false });
  }
}
