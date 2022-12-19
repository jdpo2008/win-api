import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard, PaginationDto } from '@lib/common';
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Controller('feature')
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createFeatureDto: CreateFeatureDto, @Req() req: any) {
    return this.featureService.create({
      ...createFeatureDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.featureService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.featureService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFeatureDto: UpdateFeatureDto,
    @Req() req: any,
  ) {
    return this.featureService.update(id, {
      ...updateFeatureDto,
      updatedBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.featureService.remove(id);
  }
}
