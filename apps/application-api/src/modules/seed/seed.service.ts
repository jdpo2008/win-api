/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  Feature,
  Product,
  Profile,
  Service,
  TipoDocumento,
  User,
  Job,
  BlogCategory,
  Equipo,
} from '@lib/common';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async seedData() {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Se crea el Perfil ADMIN
      const profile = await queryRunner.manager.create(Profile, {
        nombre: 'ADMIN',
        descripcion: 'Profile to total admin',
      });

      const profile02 = await queryRunner.manager.create(Profile, {
        nombre: 'USUARIO',
        descripcion: 'Profile to total admin',
      });

      const profile03 = await queryRunner.manager.create(Profile, {
        nombre: 'VENDEDOR',
        descripcion: 'Profile to total admin',
      });

      await queryRunner.manager.save([profile, profile02, profile03]);

      // Se crea el usuario inicial y se asigna el rol ADMIN
      const user = await queryRunner.manager.create(User, {
        nombres: 'José Daniel',
        apellidos: 'Pérez Ochoa',
        email: 'jdpo2008@gmail.com',
        telefono: '+51910380781',
        password: 'EAWP8JBMS2M2PJ28LBX4MHQ',
        perfil: profile,
      });

      await queryRunner.manager.save(user);

      // Se crean los productos principales
      const product01 = await queryRunner.manager.create(Product, {
        nombre: 'WIN INTERNET',
        descripcion: 'producto 1 que se ofrece',
        createdBy: user.id,
      });

      const product02 = await queryRunner.manager.create(Product, {
        nombre: 'WIN INTERNET + DIRECT GO',
        descripcion: 'producto 2 que se ofrece',
        createdBy: user.id,
      });

      const product03 = await queryRunner.manager.create(Product, {
        nombre: 'WIN INTERNET GAMER',
        descripcion: 'producto 3 que se ofrece',
        createdBy: user.id,
      });

      await queryRunner.manager.save([product01, product02, product03]);

      // Se crean los equipos
      const equipo01 = await queryRunner.manager.create(Equipo, {
        nombre: 'Mesh',
        descripcion: 'Mesh para Internet e internet + tv digital',
        cantidad: 1,
        imagenUrl: 'mesh.png',
      });

      const equipo02 = await queryRunner.manager.create(Equipo, {
        nombre: 'McAfee',
        descripcion: 'McAfee para Internet',
        cantidad: 1,
        imagenUrl: 'mcafee.png',
      });

      const equipo03 = await queryRunner.manager.create(Equipo, {
        nombre: 'Win Box',
        descripcion: 'Win Box para internet + tv digital',
        cantidad: 1,
        imagenUrl: 'box.png',
      });

      const equipo04 = await queryRunner.manager.create(Equipo, {
        nombre: 'Mesh',
        descripcion: 'Mesh para internet',
        cantidad: 2,
        imagenUrl: 'mesh.png',
      });

      await queryRunner.manager.save([equipo01, equipo02, equipo03, equipo04]);

      // Se crean las caracteristicas de los servicios
      const feature01 = await queryRunner.manager.create(Feature, {
        descripcion: 'Internet ilimitado y simetrico',
        icon: 'ilimitado.png',
        createdBy: user.id,
      });

      const feature02 = await queryRunner.manager.create(Feature, {
        descripcion: '100% Fibra optica',
        icon: 'fibra.png',
        createdBy: user.id,
      });

      const feature03 = await queryRunner.manager.create(Feature, {
        descripcion: 'Mayor Velocidad',
        icon: 'velocidad.png',
        createdBy: user.id,
      });

      const feature04 = await queryRunner.manager.create(Feature, {
        descripcion: '+60 canales en vivo',
        icon: 'canales.png',
        createdBy: user.id,
      });

      const feature05 = await queryRunner.manager.create(Feature, {
        descripcion: 'DIRECTV Sport',
        icon: 'directv.png',
        createdBy: user.id,
      });

      const feature06 = await queryRunner.manager.create(Feature, {
        descripcion: 'Hasta 2 dispositivos en simultáneo',
        icon: 'simultaneos.png',
        createdBy: user.id,
      });

      const feature07 = await queryRunner.manager.create(Feature, {
        descripcion: 'Enrrutamiento inteligente',
        icon: 'enrrutamiento.png',
        createdBy: user.id,
      });

      const feature08 = await queryRunner.manager.create(Feature, {
        descripcion: 'Velocidad Simetrica',
        icon: 'enrrutamiento.png',
        createdBy: user.id,
      });

      const feature09 = await queryRunner.manager.create(Feature, {
        descripcion: 'Atencion tecnica especializada',
        icon: 'atencion.png',
        createdBy: user.id,
      });

      await queryRunner.manager.save([
        feature01,
        feature02,
        feature03,
        feature04,
        feature05,
        feature06,
        feature07,
        feature08,
        feature09,
      ]);

      // Se crean los servicios de cada producto
      const service01 = await queryRunner.manager.create(Service, {
        nombre: 'Internet Fibra WIN',
        descripcion: '',
        precio: 99,
        velocidad_actual: '200 Mbps',
        velocidad_anterior: '100 Mbps',
        tiene_promocion: true,
        promocion: 'X2 meses',
        producto: product01,
        equipos: [],
        caracteristicas: [feature01, feature02, feature03],
        createdBy: user.id,
      });

      const service02 = await queryRunner.manager.create(Service, {
        nombre: 'Internet Fibra WIN',
        descripcion: '',
        precio: 169,
        velocidad_actual: '600 Mbps',
        velocidad_anterior: '300 Mbps',
        tiene_promocion: true,
        promocion: 'X2 meses',
        producto: product01,
        equipos: [equipo01],
        caracteristicas: [feature01, feature02, feature03],
        createdBy: user.id,
      });

      const service03 = await queryRunner.manager.create(Service, {
        nombre: 'Internet Fibra WIN',
        descripcion: '',
        precio: 259,
        velocidad_actual: '600 Mbps',
        velocidad_anterior: null,
        tiene_promocion: false,
        promocion: null,
        producto: product01,
        equipos: [equipo04, equipo02],
        caracteristicas: [feature01, feature02, feature03],
        createdBy: user.id,
      });

      const service04 = await queryRunner.manager.create(Service, {
        nombre: 'Internet Fibra WIN',
        descripcion: '',
        precio: 149,
        velocidad_actual: '200 Mbps',
        velocidad_anterior: '100 Mbps',
        tiene_promocion: true,
        promocion: 'X3 meses',
        producto: product02,
        equipos: [equipo03],
        caracteristicas: [
          feature01,
          feature02,
          feature03,
          feature04,
          feature05,
          feature06,
        ],
        createdBy: user.id,
      });

      const service05 = await queryRunner.manager.create(Service, {
        nombre: 'Internet Fibra WIN',
        descripcion: '',
        precio: 194,
        velocidad_actual: '600 Mbps',
        velocidad_anterior: '300 Mbps',
        tiene_promocion: true,
        promocion: 'X3 meses',
        producto: product02,
        equipos: [equipo03, equipo01],
        caracteristicas: [
          feature01,
          feature02,
          feature03,
          feature04,
          feature05,
          feature06,
        ],
        createdBy: user.id,
      });

      const service06 = await queryRunner.manager.create(Service, {
        nombre: 'Internet Fibra WIN',
        descripcion: '',
        precio: 274,
        velocidad_actual: '600 Mbps',
        velocidad_anterior: null,
        tiene_promocion: false,
        promocion: null,
        producto: product02,
        equipos: [equipo03, equipo01],
        caracteristicas: [
          feature01,
          feature02,
          feature03,
          feature04,
          feature05,
          feature06,
        ],
        createdBy: user.id,
      });

      const service07 = await queryRunner.manager.create(Service, {
        nombre: 'Plan Gamer Internet Fibra WIN',
        descripcion: '',
        precio: 129,
        velocidad_actual: '100 Mbps',
        velocidad_anterior: null,
        tiene_promocion: false,
        promocion: null,
        producto: product03,
        equipos: [],
        caracteristicas: [
          feature01,
          feature02,
          feature03,
          feature04,
          feature05,
          feature06,
          feature07,
          feature08,
          feature09,
        ],
        createdBy: user.id,
      });

      const service08 = await queryRunner.manager.create(Service, {
        nombre: 'Plan Gamer Internet Fibra WIN',
        descripcion: '',
        precio: 149,
        velocidad_actual: '300 Mbps',
        velocidad_anterior: null,
        tiene_promocion: false,
        promocion: null,
        producto: product03,
        equipos: [equipo01],
        caracteristicas: [
          feature01,
          feature02,
          feature03,
          feature04,
          feature04,
          feature05,
          feature06,
          feature07,
          feature08,
          feature09,
        ],
        createdBy: user.id,
      });

      const service09 = await queryRunner.manager.create(Service, {
        nombre: 'Plan Gamer Internet Fibra WIN',
        descripcion: '',
        precio: 199,
        velocidad_actual: '150 Mbps',
        velocidad_anterior: null,
        tiene_promocion: false,
        promocion: null,
        producto: product03,
        equipos: [equipo01],
        caracteristicas: [
          feature01,
          feature02,
          feature03,
          feature04,
          feature04,
          feature05,
          feature06,
          feature07,
          feature08,
          feature09,
        ],
        createdBy: user.id,
      });

      await queryRunner.manager.save([
        service01,
        service02,
        service03,
        service04,
        service05,
        service06,
        service07,
        service08,
        service09,
      ]);

      // Se crean las categorias de los blogs
      const category01 = await queryRunner.manager.create(BlogCategory, {
        nombre: 'Entretenimiento',
        descripcion: 'Categoria para blogs - Entretenimiento',
        createdBy: user.id,
      });

      const category02 = await queryRunner.manager.create(BlogCategory, {
        nombre: 'Productividad',
        descripcion: 'Categoria para blogs - Productividad',
        createdBy: user.id,
      });

      const category03 = await queryRunner.manager.create(BlogCategory, {
        nombre: 'Educación',
        descripcion: 'Categoria para blogs - Educación',
        createdBy: user.id,
      });

      const category04 = await queryRunner.manager.create(BlogCategory, {
        nombre: 'Seguridad en Internet',
        descripcion: 'Categoria para blogs - Seguridad en Internet',
        createdBy: user.id,
      });

      const category05 = await queryRunner.manager.create(BlogCategory, {
        nombre: 'Actualidad',
        descripcion: 'Categoria para blogs - Actualidad',
        createdBy: user.id,
      });

      const category06 = await queryRunner.manager.create(BlogCategory, {
        nombre: 'Tecnologia',
        descripcion: 'Categoria para blogs - Tecnologia',
        createdBy: user.id,
      });

      await queryRunner.manager.save([
        category01,
        category02,
        category03,
        category04,
        category05,
        category06,
      ]);

      // Se crean los tipos de documentos
      const tipo01 = await queryRunner.manager.create(TipoDocumento, {
        nombre: 'DNI',
        descripcion: 'Documento de identidad nacional',
        createdBy: user.id,
      });

      const tipo02 = await queryRunner.manager.create(TipoDocumento, {
        nombre: 'Pasaporte',
        descripcion: 'Documento Pasaporte',
        createdBy: user.id,
      });

      const tipo03 = await queryRunner.manager.create(TipoDocumento, {
        nombre: 'Carnet de Extranjeria',
        descripcion: 'Documento Carnet de Extranjeria',
        createdBy: user.id,
      });

      await queryRunner.manager.save([tipo01, tipo02, tipo03]);

      // Se crean los empleos
      const empleo01 = await queryRunner.manager.create(Job, {
        nombre: 'Comunity Manager',
        descripcion: 'Empleo Comunity Manager',
        createdBy: user.id,
      });

      const empleo02 = await queryRunner.manager.create(Job, {
        nombre: 'Gestor Comercial',
        descripcion: 'Empleo Gestor Comercial',
        createdBy: user.id,
      });

      const empleo03 = await queryRunner.manager.create(Job, {
        nombre: 'Ejecutivo de Ventas',
        descripcion: 'Empleo Ejecutivo de Ventas',
        createdBy: user.id,
      });

      const empleo04 = await queryRunner.manager.create(Job, {
        nombre: 'Supervisor(a) de Ventas',
        descripcion: 'Empleo Supervisor(a) de Ventas',
        createdBy: user.id,
      });

      await queryRunner.manager.save([empleo01, empleo02, empleo03, empleo04]);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return { isSuccess: true, message: 'Data cargada de forma correcta' };
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new BadRequestException('Error al cargar la data inicial');
    }
  }
}
