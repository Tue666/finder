import { Field, InputType } from '@nestjs/graphql';
import { TagType } from '../../../constants/enum';
import { ITag, ITagCreate } from '../interfaces/tag';

@InputType()
export class CreateTagInput implements ITagCreate {
  @Field()
  name: string;

  @Field(() => TagType)
  type: TagType;

  @Field(() => TagType, { nullable: true })
  parentType: TagType;
}

@InputType()
export class FilterGetAllTag implements Partial<ITag> {
  @Field({ nullable: true })
  name: string;

  @Field(() => TagType, { nullable: true })
  type?: TagType;

  @Field(() => TagType, { nullable: true })
  parentType?: TagType;
}
