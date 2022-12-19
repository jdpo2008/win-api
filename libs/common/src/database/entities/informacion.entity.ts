/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common.entity';

@Entity('informacion')
export class Informacion extends CommonEntity {
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  email: string;

  @Column()
  celular: string;

  @Column()
  departamento: string;

  @Column()
  provincia: string;

  @Column()
  distrito: string;

  @Column()
  direccion: string;
}
