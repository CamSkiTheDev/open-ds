import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.schema';

export type ProductPriceDocument = HydratedDocument<ProductPrice>;

@Schema({ _id: false })
class VariantPrice {
  @Prop()
  skuId: string;

  @Prop()
  optionValueIds: string;

  @Prop()
  availableQuantity: number;

  @Prop()
  originalPrice: number;

  @Prop()
  salePrice: number;
}

@Schema({ _id: false })
class VariantOptionValue {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  displayName: string;

  @Prop()
  image: string;
}

@Schema({ _id: false })
class VariantOption {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  values: VariantOptionValue[];
}

@Schema({ _id: false })
class Variants {
  @Prop()
  options: VariantOption[];

  @Prop()
  prices: VariantPrice[];
}

@Schema({ _id: false })
class PriceObj {
  @Prop()
  min: number;

  @Prop()
  max: number;
}

@Schema({ timestamps: true })
export class ProductPrice {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  originalPrice: PriceObj;

  @Prop()
  salePrice: PriceObj;

  @Prop()
  variants: Variants;
}

export const ProductPriceSchema = SchemaFactory.createForClass(ProductPrice);
