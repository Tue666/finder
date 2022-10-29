import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../modules/user/entities/user.entities';
import { UserService } from '../modules/user/user.service';
import { LoginInput, RegisterInput } from './dto/auth.dto';
import { JwtPayload } from './entities/auth.entities';
import { Cache } from 'cache-manager';
import { MailService } from '../modules/mail/mail.service';
import { RegisterType } from '../constants/enum';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateTokens(user: User): Promise<JwtPayload> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: user._id,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        },
      ),
      this.jwtService.signAsync(
        {
          username: user.email,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async signIn(input: LoginInput): Promise<JwtPayload> {
    const user = await this.userService.signIn(input);
    if (!user.isConfirmMail) {
      throw new UnauthorizedException('Email is not confirm');
    }
    return await this.generateTokens(user);
  }

  async signUp(register: RegisterInput): Promise<boolean> {
    const [user, token] = await Promise.all([
      this.userService.signUp(register),
      this.mailService.generateToken(register.email),
    ]);
    const urlConfirm = `${process.env.FRONT_END_URL_CONFIRM_MAIL}?token=${token}`;
    await this.mailService.sendVerifyMail(user, urlConfirm);
    return true;
  }

  async forgotPassword(email: string): Promise<boolean> {
    const user = await this.userService.getOne({ email });
    if (!user) {
      throw new BadRequestException('Email is not exists');
    }
    const randomCode = (Math.random() * (999999 - 100000) + 100000).toFixed(0);
    await Promise.all([
      await this.userService.setResetCode(user, randomCode),
      await this.mailService.sendResetPasswordMail(randomCode, user),
    ]);
    return true;
  }

  async refreshToken(
    refreshToken: string,
    rfPayload: any,
  ): Promise<JwtPayload> {
    const keyRefresh = rfPayload.email + rfPayload.refreshToken;
    const key = await this.cacheManager.get(keyRefresh);
    return null;
  }

  async loginWithGoogle(req): Promise<JwtPayload> {
    try {
      const user = req.user as User;
      const [userGoogle, userNormal] = await Promise.all([
        this.userService.getOne({
          email: user.email,
          registerType: RegisterType.GOOGLE,
        }),
        this.userService.getOne({
          email: user.email,
          registerType: RegisterType.NORMAL,
        }),
      ]);
      if (!userGoogle && !userNormal) {
        user.username = req.user.firstName + ' ' + req.user.lastName;
        user.images.push(req.user.picture);
        user.registerType = RegisterType.GOOGLE;
        await this.userService.createWithGoogle(user);
      } else if (userNormal) {
        throw new BadRequestException('Email has been used');
      }
      return await this.generateTokens(user);
    } catch (error) {
      throw error;
    }
  }
  async loginWithFacebook(req) {
    console.log(req?.user);
  }
}
