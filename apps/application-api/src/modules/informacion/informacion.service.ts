import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Informacion, PageDto, PageMetaDto, PaginationDto } from '@lib/common';
import { NOTIFICATION_SERVICE } from '../../constants/services';
import { CreateInformacionDto } from './dto/create-informacion.dto';
import { UpdateInformacionDto } from './dto/update-informacion.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class InformacionService {
  constructor(
    @InjectRepository(Informacion)
    private _informacionRepository: Repository<Informacion>,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
    private readonly dataSource: DataSource,
  ) {}

  async create(createInformacionDto: CreateInformacionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const informacion = await queryRunner.manager.create(Informacion, {
        ...createInformacionDto,
      });

      await queryRunner.manager.save(informacion);

      await lastValueFrom(
        this.notificationClient.emit('informacion_created', {
          createInformacionDto,
        }),
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return informacion;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const queryBuilder = this._informacionRepository.createQueryBuilder('p');

    queryBuilder
      .where('p.active = :active', { active: true })
      .orderBy('p.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const informacion = await this._informacionRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!informacion) throw new NotFoundException('Esta informacion no existe');
    return informacion;
  }

  async update(id: string, updateInformacionDto: UpdateInformacionDto) {
    const informacion = await this._informacionRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!informacion)
      throw new NotFoundException('Este informaciono no existe');

    const updatedinformacion = Object.assign(informacion, updateInformacionDto);

    return await this._informacionRepository.save(updatedinformacion);
  }

  async remove(id: string) {
    const informacion = await this._informacionRepository.findOneBy({ id: id });
    if (!informacion) throw new NotFoundException('Este informacion no existe');

    await this._informacionRepository.update(id, { active: false });
  }
}
