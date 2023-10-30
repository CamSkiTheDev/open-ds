import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  title: string;

  @Prop({ index: true, unique: true })
  aliProductId: string;

  @Prop({ type: [String] })
  images: string[];

  @Prop()
  totalAvailableQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
