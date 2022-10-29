import { Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entities';
import { UserService } from './user.service';

@Resolver(User.name)
export class UserResolver {
  constructor(private userService: UserService) {}
}
