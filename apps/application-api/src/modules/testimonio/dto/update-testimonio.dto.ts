import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateTestimonioDto } from './create-testimonio.dto';

export class UpdateTestimonioDto extends PartialType(CreateTestimonioDto) {
  @IsOptional()
  @IsString()
  updateddBy: string;
}
