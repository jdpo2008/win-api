/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: true, nullable: false })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', default: new Date() })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  @Exclude()
  createdBy?: string;

  @UpdateDateColumn({ type: 'timestamp with time zone', default: null })
  @Exclude()
  updatedAt?: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  @Exclude()
  updatedBy?: string;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
    default: null,
  })
  @Exclude()
  deletedAt?: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  @Exclude()
  deletedBy?: string;
}
