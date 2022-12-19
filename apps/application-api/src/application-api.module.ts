/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule, DatabaseModule } from '@lib/common';
import { ApplicationApiController } from './application-api.controller';
import { ApplicationApiService } from './application-api.service';
import { ProductModule } from './modules/product/product.module';
import { ServiceModule } from './modules/service/service.module';
import { FeatureModule } from './modules/feature/feature.module';
import { SeedModule } from './modules/seed/seed.module';
import { BlogModule } from './modules/blog/blog.module';
import { BlogCategoryModule } from './modules/blog-category/blog-category.module';
import { BannerModule } from './modules/banner/banner.module';
import { EmpleoModule } from './modules/empleo/empleo.module';
import { EquipoModule } from './modules/equipo/equipo.module';
import { TipoDocumentoModule } from './modules/tipo_documento/tipo_documento.module';
import { RegionModule } from './modules/region/region.module';
import { PostulacionModule } from './modules/postulacion/postulacion.module';
import { TestimonioModule } from './modules/testimonio/testimonio.module';
import { InformacionModule } from './modules/informacion/informacion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/application-api/.env',
    }),
    DatabaseModule,
    BannerModule,
    BlogCategoryModule,
    BlogModule,
    EquipoModule,
    EmpleoModule,
    FeatureModule,
    PostulacionModule,
    ProductModule,
    RegionModule,
    ServiceModule,
    SeedModule,
    TestimonioModule,
    TipoDocumentoModule,
    AuthModule,
    InformacionModule,
  ],
  controllers: [ApplicationApiController],
  providers: [ApplicationApiService],
})
export class ApplicationApiModule {}
