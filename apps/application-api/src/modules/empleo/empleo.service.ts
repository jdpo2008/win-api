import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job, PageDto, PageMetaDto, PaginationDto } from '@lib/common';
import { CreateEmpleoDto } from './dto/create-empleo.dto';
import { UpdateEmpleoDto } from './dto/update-empleo.dto';

@Injectable()
export class EmpleoService {
  constructor(
    @InjectRepository(Job)
    private _empleoRepository: Repository<Job>,
  ) {}

  async create(createEmpleoDto: CreateEmpleoDto) {
    const empleo = await this._empleoRepository.create({
      ...createEmpleoDto,
    });

    await this._empleoRepository.save(empleo);

    return empleo;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._empleoRepository.createQueryBuilder('empleo');

    queryBuilder
      .where('empleo.active = :active', { active: true })
      .orderBy('empleo.createdAt', paginationDto?.order)
      .skip(paginationDto?.skip)
      .take(paginationDto?.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const empleo = await this._empleoRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!empleo) throw new NotFoundException('El empleo no existe en la BD');

    return empleo;
  }

  async update(id: string, updateEmpleoDto: UpdateEmpleoDto) {
    const empleo = await this._empleoRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!empleo) throw new NotFoundException('Este empleo no existe');
    const updatEdempleo = Object.assign(empleo, updateEmpleoDto);

    return await this._empleoRepository.save(updatEdempleo);
  }

  async remove(id: string) {
    const empleo = await this._empleoRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!empleo) throw new NotFoundException('El empleo no existe en la BD');

    return await this._empleoRepository.update(id, { active: false });
  }
}
