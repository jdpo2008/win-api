import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PageDto, PageMetaDto, PaginationDto, User } from '@lib/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NOTIFICATION_SERVICE } from '../../constants/services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
    private readonly dataSource: DataSource,
  ) {}

  async create(request: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.validateCreateUserDto(request);
      const user = await queryRunner.manager.create(User, {
        ...request,
      });

      await queryRunner.manager.save(user);

      await lastValueFrom(
        this.notificationClient.emit('user_created', {
          request,
        }),
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  private async validateCreateUserDto(request: CreateUserDto) {
    let user: User;
    try {
      user = await this._userRepository.findOne({
        where: [{ email: request.email }],
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this._userRepository.findOne({
      where: [{ email: email }],
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }

    const passwordIsValid = await bcrypt.compare(password, user?.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async findOne(id: string) {
    return await this._userRepository.findOne({
      where: [{ id: id, active: true }],
      relations: {
        perfil: true,
      },
    });
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._userRepository.createQueryBuilder('u');

    queryBuilder
      .innerJoinAndSelect('u.perfil', 'perfiles')
      .where('u.active = :active', { active: true })
      .orderBy('u.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this._userRepository.findOne({
      where: [{ id: id, active: true }],
      relations: {
        perfil: true,
      },
    });

    if (!user) throw new NotFoundException('Este usuario no existe');
    const updatedUser = Object.assign(user, updateUserDto);

    return await this._userRepository.save(updatedUser);
  }

  async remove(id: string) {
    try {
      return await this._userRepository.softDelete(id);
    } catch (error) {
      throw new NotFoundException(`This #${id} no exist in the database`);
    }
  }
}
