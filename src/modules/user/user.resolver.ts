import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { GetUser } from '../../common/decorators/getuser.decorators';
import { AtGuard } from '../../common/guard/at.guard';
import { Constants } from '../../constants/constants';
import { PaginationInput } from '../common/dto/common.dto';
import {
  FilterGetAllUser,
  MySettingInput,
  UpdateUserInput,
} from './dto/create-user.dto';
import { User, UserResult } from './entities/user.entities';
import { UserService } from './user.service';

@Resolver(User.name)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserResult)
  getAllUser(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('filter', { type: () => FilterGetAllUser, nullable: true })
    filter: FilterGetAllUser,
  ): Promise<UserResult> {
    return this.userService.getAllUser(pagination, filter);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  updateProfile(
    @GetUser() user: User,
    @Args('input') input: UpdateUserInput,
  ): Promise<boolean> {
    return this.userService.updateProfile(
      user,
      input,
      Constants.UPDATE_PROFILE,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  changeSetting(
    @GetUser() user: User,
    @Args('input') input: MySettingInput,
  ): Promise<boolean> {
    return this.userService.updateProfile(
      user,
      input,
      Constants.CHANGE_SETTING,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  unlikeUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.unlikeUser(user, user_id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  likeUser(
    @Args('user_id', { type: () => GraphQLObjectID }) user_id: string,
    @GetUser() user: User,
  ): Promise<boolean> {
    return this.userService.likeUser(user_id, user);
  }
}
