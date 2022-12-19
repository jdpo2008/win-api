import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from '@lib/common';
import { FilesApiController } from './files-api.controller';
import { FilesApiService } from './files-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DO_SPACES_ENDPOINT: Joi.string().required(),
        DO_SPACES_KEY: Joi.string().required(),
        DO_SPACES_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/files-api/.env',
    }),
    AuthModule,
  ],
  controllers: [FilesApiController],
  providers: [FilesApiService],
})
export class FilesApiModule {}
