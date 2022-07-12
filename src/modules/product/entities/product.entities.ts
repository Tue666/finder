import { Field, Float, HideField, ID, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { Category } from '../../category/entites/category.entities';
import { IProduct } from '../interfaces/product';

@ObjectType()
export class Product implements IProduct {
  @Field(() => ID)
  _id: string;
  @Field({ nullable: true })
  name: string;
  @Field(() => Float)
  price: Types.Decimal128 | number;
  @Field(() => Int, { nullable: true })
  rating: number;
  @Field({ nullable: true })
  title: string;
  @Field(() => Int, { nullable: true })
  discount: number;
  @Field(() => Float, { nullable: true })
  originalPrice: Types.Decimal128 | number;
  @Field(() => Int, { nullable: true })
  quantity: number;
  @Field(() => [String])
  imgUrl: [];
  @Field(() => Category)
  category: Category;
  @Field()
  displayPrice: string;
  @Field({ nullable: true })
  createAt: Date;
  @Field({ nullable: true })
  updateAt: Date;
  @Field({ nullable: true })
  slug?: string;
  @HideField()
  keyword: string;
}

@ObjectType()
export class ResultFilter implements IResultFilter<Product> {
  @Field(() => [Product], { nullable: true })
  results: Product[];

  @Field(() => [String])
  listKeyword: string[];

  @Field(() => Int, { nullable: true })
  totalCount: number;
}
