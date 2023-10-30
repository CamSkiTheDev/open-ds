import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import {
  ProductPrice,
  ProductPriceSchema,
} from './schemas/product-price.schema';
import {
  ProductShipping,
  ProductShippingSchema,
} from './schemas/product-shipping.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductPrice.name, schema: ProductPriceSchema },
      { name: ProductShipping.name, schema: ProductShippingSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
