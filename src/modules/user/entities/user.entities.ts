import { Field, Float, HideField, ID, ObjectType } from '@nestjs/graphql';
import {
  GenderEnum,
  LookingFor,
  RegisterType,
  StatusActive,
} from '../../../constants/enum';
import { Tag } from '../../tag/entities/tag.entity';
import {
  IAddress,
  IControlWhoSeesYou,
  IControlWhoYouSee,
  IDiscoverySettings,
  IGeoLocation,
  IMatchRequest,
  IMySetting,
  IUser,
} from '../interfaces/user';

@ObjectType()
export class GeoLocation implements IGeoLocation {
  @Field({ nullable: true })
  type: string;

  @Field(() => [Float], { nullable: true, description: '[lng, lat]' })
  coordinates: number[];
}

@ObjectType()
export class DiscoverySettings implements IDiscoverySettings {
  @Field(() => Number)
  minAge: number;

  @Field(() => Number)
  maxAge: number;

  @Field(() => Boolean)
  onlyShowAgeThisRange: boolean;

  @Field(() => Number)
  distance: number;

  @Field(() => Boolean)
  onlyShowDistanceThisRange: boolean;

  @Field(() => LookingFor)
  lookingFor: LookingFor;
}

@ObjectType()
export class ControlWhoSeesYou implements IControlWhoSeesYou {
  @Field(() => Boolean)
  standard: boolean;

  @Field(() => Boolean)
  onlyPeopleIveLiked: boolean;
}

@ObjectType()
export class ControlWhoYouSee implements IControlWhoYouSee {
  @Field(() => Boolean)
  balancedRecommendations: boolean;

  @Field(() => Boolean)
  recentlyActive: boolean;
}

@ObjectType()
export class MySetting implements IMySetting {
  @Field(() => DiscoverySettings)
  discovery: DiscoverySettings;

  @Field(() => ControlWhoSeesYou)
  controlWhoSeesYou: ControlWhoSeesYou;

  @Field(() => ControlWhoYouSee)
  controlWhoYouSee: ControlWhoYouSee;
}

@ObjectType()
export class Address implements IAddress {
  @Field({ nullable: true })
  district: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  country: string;
}

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field(() => GenderEnum, { nullable: true })
  gender: GenderEnum;

  @Field({ nullable: true })
  phoneNumber: string;

  @HideField()
  password: string;

  @Field(() => Address, { nullable: true })
  address: Address;

  @Field(() => Date, { nullable: true })
  birthDays: Date;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => GeoLocation, { nullable: true })
  geoLocation: GeoLocation;

  @Field(() => [String], { nullable: true })
  matched: string[];

  @Field(() => [Tag], { nullable: true })
  tags: Tag[];

  @Field(() => Boolean)
  showMeTinder: boolean;

  @Field(() => Date, { nullable: true })
  lastActive: Date;

  @Field(() => StatusActive, { nullable: true })
  statusActive?: StatusActive;

  @Field(() => MySetting)
  mySetting: MySetting;

  @Field(() => [MatchRequest], { nullable: true })
  matchRequest: MatchRequest[];

  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  keyword: string;

  @HideField()
  isConfirmMail: boolean;

  @HideField()
  registerType?: RegisterType;

  @HideField()
  resetPasswordCode?: string;
}

@ObjectType()
export class MatchRequest implements IMatchRequest {
  @Field(() => User, { nullable: true })
  sender: string | User;

  @Field(() => Date, { nullable: true })
  createdAt: Date;
}

@ObjectType()
export class UserResult implements IResult<User> {
  @Field(() => [User], { nullable: true })
  results: User[];

  @Field(() => Number, { nullable: true })
  totalCount: number;
}
