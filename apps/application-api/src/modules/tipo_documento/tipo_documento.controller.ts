/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard, PaginationDto } from '@lib/common';
import { TipoDocumentoService } from './tipo_documento.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo_documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo_documento.dto';

@Controller('tipo-documento')
export class TipoDocumentoController {
  constructor(private readonly tipoDocumentoService: TipoDocumentoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createTipoDocumentoDto: CreateTipoDocumentoDto,
    @Req() req: any,
  ) {
    return this.tipoDocumentoService.create({
      ...createTipoDocumentoDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.tipoDocumentoService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoDocumentoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTipoDocumentoDto: UpdateTipoDocumentoDto,
    @Req() req: any,
  ) {
    return this.tipoDocumentoService.update(id, {
      ...updateTipoDocumentoDto,
      updateddBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tipoDocumentoService.remove(id);
  }
}
