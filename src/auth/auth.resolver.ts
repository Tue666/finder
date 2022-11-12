import { Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/getuser.decorators';
import { GetCurrentRefreshToken } from '../common/decorators/refresh.token.decorators';
import { AtGuard } from '../common/guard/at.guard';
import { RtGuard } from '../common/guard/rt.guard';
import { User } from '../modules/user/entities/user.entities';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload, RefreshPayload } from './entities/auth.entities';
@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => JwtPayload)
  @UseGuards(RtGuard)
  refreshToken(
    @GetCurrentRefreshToken() rfPayload: RefreshPayload,
  ): Promise<JwtPayload> {
    try {
      return this.authService.refreshToken(rfPayload);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => Boolean)
  forgotPassword(@Args('email') email: string): Promise<boolean> {
    try {
      return this.authService.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => JwtPayload)
  signInAsAdmin(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<JwtPayload> {
    return this.authService.signInAsAdmin(email, password);
  }

  @Mutation(() => JwtPayload)
  signIn(
    @Args('input', { type: () => LoginInput }) input: LoginInput,
  ): Promise<JwtPayload> {
    try {
      return this.authService.signIn(input);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  signUp(
    @Args('input', { type: () => RegisterInput }) input: RegisterInput,
  ): Promise<boolean> {
    try {
      return this.authService.signUp(input);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard)
  changePassword(
    @GetUser() user: User,
    @Args('oldPassword') oldPassword: string,
    @Args('newPassword') newPassword: string,
    @Args('confirmPassword') confirmPassword: string,
  ): Promise<boolean> {
    return this.authService.changePassword(
      oldPassword,
      newPassword,
      confirmPassword,
      user,
    );
  }

  @Query(() => Boolean)
  resetCache() {
    try {
      return this.authService.resetCache();
    } catch (error) {
      throw error;
    }
  }
}
