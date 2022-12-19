/* eslint-disable prettier/prettier */
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommonEntity } from '../common.entity';
import { Profile } from './profile.entity';

@Entity('usuarios')
@Unique(['email'])
export class User extends CommonEntity {
  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telefono: string;

  @ManyToOne(() => Profile, (p: Profile) => p.usuarios, { onDelete: 'CASCADE' })
  @JoinColumn()
  public perfil: Profile;

  @BeforeInsert()
  async createUserPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
