import { PageDto, PageMetaDto, PaginationDto, Service } from '@lib/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private _serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = await this._serviceRepository.create({
      ...createServiceDto,
    });
    this._serviceRepository.save(service);
    return service;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._serviceRepository.createQueryBuilder('s');

    queryBuilder
      .innerJoinAndSelect('s.producto', 'productos')
      .innerJoinAndSelect('s.caracteristicas', 'caracteristicas')
      .innerJoinAndSelect('s.equipos', 'equipos')
      .where('s.active = :active', { active: true })
      .orderBy('s.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const service = await this._serviceRepository.findOne({
      where: [{ id: id, active: true }],
      relations: {
        caracteristicas: true,
      },
    });
    if (!service) throw new NotFoundException('Este servicio no existe');
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this._serviceRepository.findOne({
      where: [{ id: id, active: true }],
      relations: {
        caracteristicas: true,
      },
    });

    if (!service) throw new NotFoundException('Este perfil no existe');
    const updatedService = Object.assign(service, updateServiceDto);

    return await this._serviceRepository.save(updatedService);
  }

  async remove(id: string) {
    const service = await this._serviceRepository.findOneBy({ id: id });
    if (!service) throw new NotFoundException('Este perfil no existe');

    await this._serviceRepository.update(id, { active: false });
  }
}
