/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Postulation } from './postulacion.entity';
import { Testimonio } from './testimonio.entity';

@Entity('empleos')
export class Job extends CommonEntity {
  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Testimonio, (p: Testimonio) => p.empleo)
  public testimonios: Testimonio[];

  @OneToMany(() => Postulation, (p: Postulation) => p.empleo)
  public postulaciones: Postulation[];
}
