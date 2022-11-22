import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { GeoLocationInput } from '../../modules/user/dto/create-user.dto';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  geoLocation: GeoLocationInput;
}

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  code: string;

  @Field()
  password: string;

  @Field()
  confirmPassword: string;
}
