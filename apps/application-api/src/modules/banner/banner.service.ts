import { Banner, PageDto, PageMetaDto, PaginationDto } from '@lib/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(Banner) private _bannerRepository: Repository<Banner>,
  ) {}
  async create(createBannerDto: CreateBannerDto) {
    const banner = await this._bannerRepository.create({ ...createBannerDto });

    await this._bannerRepository.save(banner);

    return banner;
  }

  async findAll(paginationDto: PaginationDto) {
    const queryBuilder = this._bannerRepository.createQueryBuilder('banner');

    queryBuilder
      .where('banner.active = :active', { active: true })
      .orderBy('banner.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const banner = await this._bannerRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!banner) {
      throw new NotFoundException('El banner no fue encontrado');
    }
    return banner;
  }

  async update(id: string, updateBannerDto: UpdateBannerDto) {
    const banner = await this._bannerRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!banner) {
      throw new NotFoundException('El banner no fue encontrado');
    }

    const bannerUpdate = Object.assign(banner, updateBannerDto);

    return await this._bannerRepository.save(bannerUpdate);
  }

  async remove(id: string) {
    const banner = await this._bannerRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!banner) {
      throw new NotFoundException('El banner no fue encontrado');
    }

    return await this._bannerRepository.update(id, { active: false });
  }
}
