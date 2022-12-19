import { Inject, Injectable, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { Postulation } from '@lib/common';
import { NOTIFICATION_SERVICE } from '../../constants/services';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';

@Injectable()
export class PostulacionService {
  constructor(
    @InjectRepository(Postulation)
    private _postulacionRepository: Repository<Postulation>,
    @Inject(NOTIFICATION_SERVICE) private notificationClient: ClientProxy,
    private readonly dataSource: DataSource,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createPostulacionDto: CreatePostulacionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const postulacion = await queryRunner.manager.create(Postulation, {
        ...createPostulacionDto,
      });

      await queryRunner.manager.save(postulacion);

      await lastValueFrom(
        this.notificationClient.emit('postulacion_created', {
          ...createPostulacionDto,
        }),
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return postulacion;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findAll() {
    return null;
  }

  async findOne(id: string) {
    return null;
  }

  async update(
    id: string,
    updatePostulacionDto: UpdatePostulacionDto,
    @Req() req: any,
  ) {
    return null;
  }

  async remove(id: string) {
    return null;
  }
}
