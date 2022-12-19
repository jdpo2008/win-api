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
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { JwtAuthGuard } from '@lib/common';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRegionDto: CreateRegionDto, @Req() req: any) {
    return this.regionService.create({
      ...createRegionDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
    @Req() req: any,
  ) {
    return this.regionService.update(id, {
      ...updateRegionDto,
      updateddBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.regionService.remove(id);
  }
}
