import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesApiService } from './files-api.service';
import { diskStorage } from 'multer';
import { fileFilter, fileNamer } from './helpers';
import { JwtAuthGuard } from '@lib/common';

@Controller('file')
export class FilesApiController {
  constructor(private readonly filesApiService: FilesApiService) {}

  @Get()
  getHello(): string {
    return this.filesApiService.getHello();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: '../static/images',
        filename: fileNamer,
      }),
    }),
  )
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query() { folder }: any,
  ) {
    if (!file) {
      throw new BadRequestException('File is empty sure that is image');
    }

    return this.filesApiService.upload(file, folder);
  }
}
