/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Equipo } from './equipo.entity';
import { Feature } from './feature.entity';
import { Product } from './product.entity';

@Entity('servicios')
export class Service extends CommonEntity {
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 150 })
  descripcion: string;

  @Column({ type: 'numeric' })
  precio: number;

  @Column({ type: 'varchar', length: 100 })
  velocidad_actual: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  velocidad_anterior: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  tiene_promocion?: boolean;

  @Column({ type: 'varchar', default: null, nullable: true })
  promocion?: string;

  @ManyToOne(() => Product, (p: Product) => p.servicios)
  public producto: Product;

  @ManyToMany(() => Feature, (f: Feature) => f.servicios)
  @JoinTable()
  public caracteristicas: Feature[];

  @ManyToMany(() => Equipo, (f: Equipo) => f.servicios)
  @JoinTable()
  public equipos: Equipo[];
}
