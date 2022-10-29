import { Field, Float, HideField, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import { GraphQLObjectID } from 'graphql-scalars';
import { RegisterType } from '../../../constants/enum';
import { User } from '../entities/user.entities';
import { IGeoLocation, IUser } from '../interfaces/user';

@InputType()
export class GeoLocationInput implements IGeoLocation {
  @Field(() => [Float])
  coordinates: number[];
}

@InputType()
export class CreateUserInput {}

@InputType()
export class FilterGetOneUser implements Partial<IUser> {
  @Field(() => GraphQLObjectID, { nullable: true })
  _id?: string;

  @Field({ nullable: true })
  slug?: string;

  @IsEmail()
  @IsOptional()
  @Field({ nullable: true })
  email?: string;

  @HideField()
  registerType?: RegisterType;

  @HideField()
  resetPasswordCode?: string;
}
