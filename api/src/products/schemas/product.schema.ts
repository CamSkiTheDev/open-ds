import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;

  @Prop({ index: true, unique: true })
  aliProductId: number;

  @Prop({ type: [String] })
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
