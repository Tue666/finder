import { Field, InputType } from '@nestjs/graphql';
import { Tag } from '../entities/tag.entity';
import { ITagCreate } from '../interfaces/tag';

@InputType()
export class CreateTagInput implements ITagCreate {
  @Field()
  name: string;
}

@InputType()
export class FilterGetAllTag {
  @Field({ nullable: true })
  name: string;
}

@InputType()
export class TagResult implements IResult<Tag> {
  @Field(() => [Tag], { nullable: true })
  results: Tag[];

  @Field({ nullable: true })
  totalCount: number;
}
