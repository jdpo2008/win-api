/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common.entity';

@Entity('banners')
export class Banner extends CommonEntity {
  @Column({ type: 'varchar', length: 150 })
  titulo: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  descripcion: string;

  @Column({ type: 'int' })
  seccion: number;

  @Column({ type: 'varchar', length: 150 })
  imagenUrl?: string;

  @Column({ type: 'int' })
  orden: number;
}
