/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  User,
  Profile,
  Product,
  Service,
  Feature,
  Blog,
  BlogCategory,
  Job,
  TipoDocumento,
  Postulation,
  Region,
  Banner,
  Testimonio,
  Equipo,
  Informacion,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [
          User,
          Profile,
          Product,
          Service,
          Feature,
          Blog,
          BlogCategory,
          Job,
          TipoDocumento,
          Postulation,
          Region,
          Banner,
          Testimonio,
          Equipo,
          Informacion,
        ],
        //entities: [__dirname + '/**/*.entity.{js,ts}'],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
