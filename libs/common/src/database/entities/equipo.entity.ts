/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Service } from './service.entity';

@Entity('equipos')
export class Equipo extends CommonEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  cantidad: number;

  @Column()
  imagenUrl: string;

  @ManyToMany(() => Service, (s: Service) => s.equipos)
  public servicios: Service[];
}
