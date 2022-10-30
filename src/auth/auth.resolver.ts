import { Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentRefreshToken } from '../common/decorators/refresh.token.decorators';
import { RtGuard } from '../common/guard/rt.guard';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload, RefreshPayload } from './entities/auth.entities';
@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(RtGuard)
  @Query(() => JwtPayload)
  refreshToken(
    @Args('refreshToken') refreshToken: string,
    @GetCurrentRefreshToken() rfPayload: RefreshPayload,
  ): Promise<JwtPayload> {
    try {
      return this.authService.refreshToken(refreshToken, rfPayload);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => String)
  @UseGuards(AuthGuard('facebook'))
  loginGoogle(@Req() req) {
    return this.authService.loginWithGoogle(req);
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

  @Query(() => Boolean)
  forgotPassword(@Args('email') email: string): Promise<boolean> {
    try {
      return this.authService.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  }
}
