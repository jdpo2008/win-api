import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  PageDto,
  PageMetaDto,
  PaginationDto,
  TipoDocumento,
} from '@lib/common';
import { CreateTipoDocumentoDto } from './dto/create-tipo_documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo_documento.dto';

@Injectable()
export class TipoDocumentoService {
  constructor(
    @InjectRepository(TipoDocumento)
    private _tipoDocumentoRepository: Repository<TipoDocumento>,
  ) {}

  async create(createTipoDocumentoDto: CreateTipoDocumentoDto) {
    const tipoDocumento = await this._tipoDocumentoRepository.create({
      ...createTipoDocumentoDto,
    });
    this._tipoDocumentoRepository.save(tipoDocumento);
    return tipoDocumento;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder =
      this._tipoDocumentoRepository.createQueryBuilder('tipo_documento');

    queryBuilder
      .where('tipo_documento.active = :active', { active: true })
      .orderBy('tipo_documento.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const tipoDocumento = await this._tipoDocumentoRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!tipoDocumento)
      throw new NotFoundException('Este tipo documento no existe');
    return tipoDocumento;
  }

  async update(id: string, updateTipoDocumentoDto: UpdateTipoDocumentoDto) {
    const tipoDocumento = await this._tipoDocumentoRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!tipoDocumento)
      throw new NotFoundException('Este tipo documento no existe');
    const updatedTipoDocumento = Object.assign(
      tipoDocumento,
      updateTipoDocumentoDto,
    );

    return await this._tipoDocumentoRepository.save(updatedTipoDocumento);
  }

  async remove(id: string) {
    const tipoDocumento = await this._tipoDocumentoRepository.findOneBy({
      id: id,
    });
    if (!tipoDocumento)
      throw new NotFoundException('Este tipo docuemnto no existe');

    return await this._tipoDocumentoRepository.update(id, { active: false });
  }
}
