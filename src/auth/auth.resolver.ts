import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import Upload from 'graphql-upload/Upload.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { ObjectIDResolver } from 'graphql-scalars';
@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}
  @Query(() => String)
  providedQuery(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: Upload,
    @Args('id', { type: () => ObjectIDResolver }) id: string,
  ): string {
    return 'Hello World';
  }
}
