import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipo, PageDto, PageMetaDto, PaginationDto } from '@lib/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';

@Injectable()
export class EquipoService {
  constructor(
    @InjectRepository(Equipo)
    private _equipoRepository: Repository<Equipo>,
  ) {}

  async create(createEquipoDto: CreateEquipoDto) {
    const equipo = await this._equipoRepository.create({
      ...createEquipoDto,
    });

    await this._equipoRepository.save(equipo);

    return equipo;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._equipoRepository.createQueryBuilder('e');

    queryBuilder
      .where('e.active = :active', { active: true })
      .orderBy('e.createdAt', paginationDto?.order)
      .skip(paginationDto?.skip)
      .take(paginationDto?.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const equipo = await this._equipoRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!equipo) throw new NotFoundException('El equipo no existe en la BD');

    return equipo;
  }

  async update(id: string, updateEquipoDto: UpdateEquipoDto) {
    const equipo = await this._equipoRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!equipo) throw new NotFoundException('Este equipo no existe');
    const updatedEquipo = Object.assign(equipo, updateEquipoDto);

    return await this._equipoRepository.save(updatedEquipo);
  }

  async remove(id: string) {
    const equipo = await this._equipoRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!equipo) throw new NotFoundException('El equipo no existe en la BD');

    return await this._equipoRepository.update(id, { active: false });
  }
}
