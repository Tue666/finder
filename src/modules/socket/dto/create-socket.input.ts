import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ResponseType {
  @Field(() => Number, { nullable: true })
  code: number;

  @Field(() => Boolean, { nullable: true })
  success: boolean;

  @Field(() => String, { nullable: true })
  message: string;

  constructor(code: number, success: boolean, message: string) {
    this.code = code;
    this.success = success;
    this.message = message;
  }
}
