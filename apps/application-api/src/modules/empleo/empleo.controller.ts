/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { EmpleoService } from './empleo.service';
import { CreateEmpleoDto } from './dto/create-empleo.dto';
import { UpdateEmpleoDto } from './dto/update-empleo.dto';
import { JwtAuthGuard, PaginationDto } from '@lib/common';

@Controller('empleo')
export class EmpleoController {
  constructor(private readonly empleoService: EmpleoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createEmpleoDto: CreateEmpleoDto, @Req() req: any) {
    return this.empleoService.create({
      ...createEmpleoDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.empleoService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.empleoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmpleoDto: UpdateEmpleoDto,
    @Req() req: any,
  ) {
    return this.empleoService.update(id, {
      ...updateEmpleoDto,
      updateddBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.empleoService.remove(id);
  }
}
