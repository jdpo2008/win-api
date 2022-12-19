import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TestimonioService } from './testimonio.service';
import { CreateTestimonioDto } from './dto/create-testimonio.dto';
import { UpdateTestimonioDto } from './dto/update-testimonio.dto';
import { JwtAuthGuard, PaginationDto } from '@lib/common';

@Controller('testimonio')
export class TestimonioController {
  constructor(private readonly testimonioService: TestimonioService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTestimonioDto: CreateTestimonioDto, @Req() req: any) {
    return this.testimonioService.create({
      ...createTestimonioDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll(paginationDto: PaginationDto) {
    return this.testimonioService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.testimonioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTestimonioDto: UpdateTestimonioDto,
    @Req() req: any,
  ) {
    return this.testimonioService.update(id, {
      ...updateTestimonioDto,
      updateddBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.testimonioService.remove(id);
  }
}
