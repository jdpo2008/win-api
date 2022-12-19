/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Job } from './empleo.entity';
import { TipoDocumento } from './tipo-documento.entity';

@Entity('postulaciones')
export class Postulation extends CommonEntity {
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  documento: string;

  @Column()
  email: string;

  @Column()
  experiencia: string;

  @ManyToOne(() => Job, (p: Job) => p.postulaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public empleo: Job;

  @ManyToOne(() => TipoDocumento, (p: TipoDocumento) => p.postulaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public tipo_documento: TipoDocumento;
}
