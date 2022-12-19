import { JwtAuthGuard, PaginationDto } from '@lib/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';

@Controller('banner')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createBannerDto: CreateBannerDto, @Req() req: any) {
    return this.bannerService.create({
      ...createBannerDto,
      createdBy: req?.user?.id,
    });
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.bannerService.findAll(paginationDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.bannerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateBannerDto: UpdateBannerDto,
    @Req() req: any,
  ) {
    return this.bannerService.update(id, {
      ...updateBannerDto,
      updateddBy: req?.user?.id,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.bannerService.remove(id);
  }
}
