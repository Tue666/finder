import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ITag } from '../interfaces/tag';

@ObjectType()
export class Tag implements ITag {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field()
  slug?: string;

  @Field()
  keyword: string;
}
