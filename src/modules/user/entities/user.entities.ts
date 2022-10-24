import { Field, Float, HideField, ID, ObjectType } from '@nestjs/graphql';
import { GenderEnum } from '../../../constants/enum';
import { Tag } from '../../tag/entities/tag.entity';
import { IGeoLocation, IMatchRequest, IUser } from '../interfaces/user';

@ObjectType()
export class GeoLocation implements IGeoLocation {
  @Field({ nullable: true })
  type: string;

  @Field(() => [Float], { nullable: true, description: '[lng, lat]' })
  coordinates: number[];
}

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  email: string;

  @Field()
  username: string;

  @Field(() => GenderEnum)
  gender: GenderEnum;

  @Field({ nullable: true })
  phoneNumber: string;

  @HideField()
  password: string;

  @Field({ nullable: true })
  address: string;

  @Field(() => Date, { nullable: true })
  birthDays: Date;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => GeoLocation, { nullable: true })
  getLocation: GeoLocation;

  @Field(() => [String], { nullable: true })
  matched: string[];

  @Field(() => [Tag], { nullable: true })
  tags: Tag[];

  @Field(() => Boolean, { nullable: true })
  showMeTinder: boolean;

  @Field(() => Date, { nullable: true })
  lastActive: Date;
  // query: Object;

  @Field(() => [MatchRequest], { nullable: true })
  matchRequest: MatchRequest[];

  @Field(() => Boolean, { nullable: true })
  isDeleted: boolean;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field()
  slug?: string;

  @Field({ nullable: true })
  keyword: string;
}

@ObjectType()
export class MatchRequest implements IMatchRequest {
  @Field(() => User, { nullable: true })
  senderId: User;

  @Field(() => Date, { nullable: true })
  createdAt: Date;
}
