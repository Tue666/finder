import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ValidationError } from 'apollo-server-express';

@Resolver()
export class UserResolver {
  @Query(() => String)
  test(@Args('test', { type: () => Boolean }) test: boolean): any {
    try {
      if (test === true) {
        throw new Error('123');
      } else {
        return 'ok';
      }
    } catch (error) {
      throw error;
    }
  }
}
