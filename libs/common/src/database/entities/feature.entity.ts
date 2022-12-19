/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Service } from './service.entity';

@Entity('caracteristicas')
export class Feature extends CommonEntity {
  @Column({ type: 'varchar', length: 150 })
  descripcion: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  icon?: string;

  @ManyToMany(() => Service, (s: Service) => s.caracteristicas)
  public servicios: Service[];
}
