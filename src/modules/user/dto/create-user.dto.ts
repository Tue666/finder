import { Field, Float, HideField, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';
import { GraphQLObjectID } from 'graphql-scalars';
import { GenderEnum, LookingFor, RegisterType } from '../../../constants/enum';
import { ITag } from '../../tag/interfaces/tag';
import {
  IControlWhoSeesYou,
  IControlWhoYouSee,
  IDiscoverySettings,
  IGeoLocation,
  IMySetting,
  IUser,
  IUserUpdate,
} from '../interfaces/user';

@InputType()
export class GeoLocationInput implements IGeoLocation {
  @Field(() => [Float])
  coordinates: number[];
}

@InputType()
export class UpdateUserInput implements IUserUpdate {
  @Field({ nullable: true })
  username: string;

  @Field(() => GenderEnum, { nullable: true })
  gender: GenderEnum;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field(() => Date, { nullable: true })
  birthDays: Date;

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => [GraphQLObjectID], { nullable: true })
  tags: string[];
}

@InputType()
export class DiscoverySettingsInput implements IDiscoverySettings {
  @Field(() => Number, { nullable: true })
  minAge: number;

  @Field(() => Number, { nullable: true })
  maxAge: number;

  @Field(() => Boolean, { nullable: true })
  onlyShowAgeThisRange: boolean;

  @Field(() => Number, { nullable: true })
  distance: number;

  @Field(() => Boolean, { nullable: true })
  onlyShowDistanceThisRange: boolean;

  @Field(() => LookingFor, { nullable: true })
  lookingFor: LookingFor;
}

@InputType()
export class ControlWhoSeesYouInput implements IControlWhoSeesYou {
  @Field(() => Boolean, { nullable: true })
  standard: boolean;

  @Field(() => Boolean, { nullable: true })
  onlyPeopleIveLiked: boolean;
}

@InputType()
export class ControlWhoYouSeeInput implements IControlWhoYouSee {
  @Field(() => Boolean, { nullable: true })
  balancedRecommendations: boolean;

  @Field(() => Boolean, { nullable: true })
  recentlyActive: boolean;
}

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

@InputType()
export class MySettingInput implements IMySetting {
  @Field(() => DiscoverySettingsInput, { nullable: true })
  discovery: DiscoverySettingsInput;

  @Field(() => ControlWhoSeesYouInput, { nullable: true })
  controlWhoSeesYou: ControlWhoSeesYouInput;

  @Field(() => ControlWhoYouSeeInput, { nullable: true })
  controlWhoYouSee: ControlWhoYouSeeInput;
}
