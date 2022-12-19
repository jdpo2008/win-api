import { PageDto, PageMetaDto, PaginationDto, Profile } from '@lib/common';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private _profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    await this._validateProfile(createProfileDto);
    const profile = await this._profileRepository.create({
      ...createProfileDto,
    });
    this._profileRepository.save(profile);
    return profile;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._profileRepository.createQueryBuilder('p');

    queryBuilder
      .innerJoinAndSelect('p.usuarios', 'usuarios')
      .where('p.active = :active', { active: true })
      .orderBy('p.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string): Promise<Profile> {
    const profile = await this._profileRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!profile) throw new NotFoundException('Este perfil no existe');
    return profile;
  }

  async update(
    id: string,
    updateProfileDto: Partial<UpdateProfileDto>,
  ): Promise<Profile & Partial<UpdateProfileDto>> {
    const profile = await this._profileRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!profile) throw new NotFoundException('Este perfil no existe');
    const updatedProfile = Object.assign(profile, updateProfileDto);

    return await this._profileRepository.save(updatedProfile);
  }

  async remove(id: string) {
    const profile = await this._profileRepository.findOneBy({ id: id });
    if (!profile) throw new NotFoundException('Este perfil no existe');

    await this._profileRepository.update(id, { active: false });
  }

  private async _validateProfile(request: CreateProfileDto) {
    let profile: Profile;
    try {
      profile = await this._profileRepository.findOneBy({
        nombre: request.nombre,
      });
    } catch (err) {}

    if (profile) {
      throw new UnprocessableEntityException('Profile already exists.');
    }
  }
}
