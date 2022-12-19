/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Job } from './empleo.entity';

@Entity('testimonios')
export class Testimonio extends CommonEntity {
  @Column()
  nombre: string;

  @Column()
  comentario: string;

  @Column()
  avatarUrl: string;

  @ManyToOne(() => Job, (p: Job) => p.testimonios, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public empleo: Job;
}
