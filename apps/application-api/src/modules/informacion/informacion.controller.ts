import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { InformacionService } from './informacion.service';
import { CreateInformacionDto } from './dto/create-informacion.dto';
import { UpdateInformacionDto } from './dto/update-informacion.dto';
import { PaginationDto } from '@lib/common';

@Controller('informacion')
export class InformacionController {
  constructor(private readonly informacionService: InformacionService) {}

  @Post()
  create(@Body() createInformacionDto: CreateInformacionDto, @Req() req: any) {
    return this.informacionService.create({
      ...createInformacionDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.informacionService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.informacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInformacionDto: UpdateInformacionDto,
    @Req() req: any,
  ) {
    return this.informacionService.update(id, {
      ...updateInformacionDto,
      updatedBy: req?.user?.id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.informacionService.remove(id);
  }
}
