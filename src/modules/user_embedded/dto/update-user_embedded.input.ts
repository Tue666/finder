import { CreateUserEmbeddedInput } from './create-user_embedded.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserEmbeddedInput extends PartialType(CreateUserEmbeddedInput) {
  @Field(() => Int)
  id: number;
}
