import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import * as AliProductScraper from 'aliexpress-product-scraper';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { ProductPrice } from './schemas/product-price.schema';
import { ProductShipping } from './schemas/product-shipping.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductPrice.name)
    private productPriceModel: Model<ProductPrice>,
    @InjectModel(ProductShipping.name)
    private productShippingModel: Model<ProductShipping>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      const productData = await AliProductScraper(
        createProductDto.aliProductId,
      );

      const product = await this.productModel.findOneAndUpdate(
        {
          aliProductId: createProductDto.aliProductId,
        },
        {
          $set: {
            title: productData.title,
            aliProductId: productData.productId,
            images: productData.images,
            totalAvailableQuantity: productData.totalAvailableQuantity,
          },
        },
        { new: true, upsert: true },
      );

      const productPrice = await this.productPriceModel.create({
        product: product._id,
        originalPrice: productData.originalPrice,
        salePrice: productData.salePrice,
        variants: productData.variants,
      });

      const productShippingOptions = [];

      for (let i = 0; i < productData.shipping?.length ?? 0; i++) {
        const shippingData = productData.shipping[i];

        const shippingOption = await this.productShippingModel.findOneAndUpdate(
          {
            product: product._id,
            deliveryProviderName: shippingData.deliveryProviderName,
            provider: shippingData.provider,
          },
          { $set: { ...shippingData } },
          { new: true, upsert: true },
        );

        productShippingOptions.push(shippingOption);
      }

      return { product, productPrice, productShippingOptions };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Ubable to get product data.');
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
