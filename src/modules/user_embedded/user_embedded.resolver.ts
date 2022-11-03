import { Resolver } from '@nestjs/graphql';
import { UserEmbedded } from './entities/user_embedded.entity';
import { UserEmbeddedService } from './user_embedded.service';

@Resolver(() => UserEmbedded)
export class UserEmbeddedResolver {
  constructor(private readonly userEmbeddedService: UserEmbeddedService) {}
}
