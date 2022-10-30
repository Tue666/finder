import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetUser } from '../../common/decorators/getuser.decorators';
import { AtGuard } from '../../common/guard/at.guard';
import { MySettingInput, UpdateUserInput } from './dto/create-user.dto';
import { User } from './entities/user.entities';
import { UserService } from './user.service';

@Resolver(User.name)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  updateProfile(
    @GetUser() user: User,
    @Args('input') input: UpdateUserInput,
  ): Promise<boolean> {
    return this.userService.updateProfile(user, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  changeSetting(
    @GetUser() user: User,
    @Args('input') input: MySettingInput,
  ): Promise<boolean> {
    return this.userService.updateProfile(user, input);
  }
}
