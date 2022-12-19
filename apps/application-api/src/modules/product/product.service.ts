import { PageDto, PageMetaDto, PaginationDto, Product } from '@lib/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private _productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this._productRepository.create({
      ...createProductDto,
    });
    this._productRepository.save(product);
    return product;
  }

  async findAll(paginationDto?: PaginationDto) {
    const queryBuilder = this._productRepository.createQueryBuilder('p');

    queryBuilder
      .innerJoinAndSelect('p.servicios', 'servicios')
      .innerJoinAndSelect('servicios.caracteristicas', 'caracteristicas')
      .where('p.active = :active', { active: true })
      .orderBy('p.createdAt', paginationDto.order)
      .skip(paginationDto.skip)
      .take(paginationDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, paginationDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: string) {
    const product = await this._productRepository.findOneBy({
      id: id,
      active: true,
    });
    if (!product) throw new NotFoundException('Este producto no existe');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this._productRepository.findOneBy({
      id: id,
      active: true,
    });

    if (!product) throw new NotFoundException('Este producto no existe');
    const updatedProduct = Object.assign(product, updateProductDto);

    return await this._productRepository.save(updatedProduct);
  }

  async remove(id: string) {
    const product = await this._productRepository.findOneBy({ id: id });
    if (!product) throw new NotFoundException('Este producto no existe');

    await this._productRepository.update(id, { active: false });
  }
}
