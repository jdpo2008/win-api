/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { Blog } from './blog.entity';

@Entity('blog_categorias')
export class BlogCategory extends CommonEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  descripcion?: string;

  @OneToMany(() => Blog, (blog: Blog) => blog.blog_categoria)
  blogs: Blog[];
}
