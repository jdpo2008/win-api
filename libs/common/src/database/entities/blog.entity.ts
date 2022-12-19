/* eslint-disable prettier/prettier */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { BlogCategory } from './blog-category.entity';

@Entity('blogs')
export class Blog extends CommonEntity {
  @Column({ type: 'varchar', length: 150, nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  contenido: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  blogImage?: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  views?: number;

  @Column({ type: 'boolean', nullable: true, default: false })
  isPopular?: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  isFavorite?: boolean;

  @ManyToOne(() => BlogCategory, (b: BlogCategory) => b.blogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  blog_categoria: BlogCategory;
}
