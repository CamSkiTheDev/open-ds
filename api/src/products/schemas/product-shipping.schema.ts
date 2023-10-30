import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from './product.schema';

export type ProductShippingDocument = HydratedDocument<ProductShipping>;

@Schema({ timestamps: true })
export class ProductShipping {
  @Prop({ type: Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  deliveryProviderName: string;

  @Prop()
  tracking: string;

  @Prop()
  provider: string;

  @Prop()
  company: string;

  @Prop()
  shipFrom: string;

  @Prop()
  deliveryDayMax: number;

  @Prop()
  deliveryDayMin: number;

  @Prop()
  displayAmount: number;

  @Prop()
  formattedAmount: string;
}

export const ProductShippingSchema =
  SchemaFactory.createForClass(ProductShipping);
