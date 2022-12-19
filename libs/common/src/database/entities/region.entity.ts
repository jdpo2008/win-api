/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common.entity';

@Entity('regiones')
export class Region extends CommonEntity {
  @Column({ type: 'varchar', length: 100 })
  region: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  descripcion?: string;

  @Column({ type: 'varchar', length: 100 })
  departamento: string;

  @Column({ type: 'varchar', length: 250 })
  imagenUrl: string;
}
