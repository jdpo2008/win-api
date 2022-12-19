/* eslint-disable prettier/prettier */
import { IsArray } from 'class-validator';
import { PageMetaDto } from './page.meta.dto';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];

  readonly pagination: PageMetaDto;

  constructor(data: T[], pagination: PageMetaDto) {
    this.data = data;
    this.pagination = pagination;
  }
}
