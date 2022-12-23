import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TagType } from "../../../constants/enum";
import { ITag } from "../interfaces/tag";

@ObjectType()
export class Tag implements ITag {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => TagType, { nullable: true })
  type: TagType;

  @Field(() => TagType, { nullable: true })
  parentType: TagType;

  @Field({ nullable: true })
  description: string;

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  keyword: string;
}

@ObjectType()
export class TagResult implements IResult<Tag> {
  @Field(() => [Tag], { nullable: true })
  results: Tag[];

  @Field({ nullable: true })
  totalCount: number;
}
