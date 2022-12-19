/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { User } from './user.entity';

@Entity('perfiles')
export class Profile extends CommonEntity {
  @Column({ type: 'varchar', length: 25 })
  nombre: string;

  @Column({ type: 'varchar', length: 100 })
  descripcion: string;

  @OneToMany(() => User, (user: User) => user.perfil)
  public usuarios: User[];
}
