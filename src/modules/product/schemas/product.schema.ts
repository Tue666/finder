import { Document, Schema, Types } from 'mongoose';
import { Category } from '../../category/entites/category.entities';
import { Product } from '../entities/product.entities';

export type ProductDocument = Product & Document;
export const ProductSchema = new Schema<Product>(
  {
    name: {
      type: String,
      trim: true,
    },
    price: {
      type: Schema.Types.Decimal128,
      min: [0, 'min is 0'],
      get: function (val: Types.Decimal128): number {
        if (val) {
          return +val.toString();
        }
        return 0;
      },
    },
    displayPrice: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
    },
    imgUrl: [],
    category: {
      type: Schema.Types.ObjectId,
      ref: Category.name,
      autopopulate: true,
    },
    slug: {
      type: String,
    },
    keyword: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);
