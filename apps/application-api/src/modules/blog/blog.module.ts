import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, Blog } from '@lib/common';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), AuthModule],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
