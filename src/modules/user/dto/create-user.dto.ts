import { Field, InputType } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { IUser } from '../interfaces/user';

@InputType()
export class FilterGetOneUser implements Partial<IUser> {
  @Field(() => GraphQLObjectID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  slug?: string;
}
