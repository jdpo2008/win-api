import { Module } from '@nestjs/common';
import { TipoDocumentoService } from './tipo_documento.service';
import { TipoDocumentoController } from './tipo_documento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule, TipoDocumento } from '@lib/common';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumento]), AuthModule],
  controllers: [TipoDocumentoController],
  providers: [TipoDocumentoService],
})
export class TipoDocumentoModule {}
