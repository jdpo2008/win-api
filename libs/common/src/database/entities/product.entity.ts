/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Service } from './service.entity';

@Entity('productos')
export class Product extends CommonEntity {
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  @OneToMany(() => Service, (s: Service) => s.producto)
  public servicios: Service[];
}
