/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Postulation } from './postulacion.entity';

@Entity('tipo_documento')
export class TipoDocumento extends CommonEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Postulation, (p: Postulation) => p.tipo_documento)
  public postulaciones: Postulation[];
}
