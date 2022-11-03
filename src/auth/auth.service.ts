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
import { JwtPayload, RefreshPayload } from './entities/auth.entities';
import { Cache } from 'cache-manager';
import { MailService } from '../modules/mail/mail.service';
import { RegisterType } from '../constants/enum';
import { Constants } from '../constants/constants';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async generateTokens(_id: string): Promise<JwtPayload> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { _id },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        },
      ),
      this.jwtService.signAsync(
        { _id },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        },
      ),
    ]);
    await this.cacheManager.set(_id, refreshToken, {
      ttl: Constants.REFRESH_TOKEN_TTL,
    });
    return { accessToken, refreshToken };
  }

  async signIn(input: LoginInput): Promise<JwtPayload> {
    try {
      const [long, lat] = [-73.856077, 40.848447];
      const user = await this.userService.signIn(input);
      if (!user.isConfirmMail) {
        throw new UnauthorizedException('Email is not confirm');
      }
      await this.userService.findOneAndUpdate(
        { _id: user._id },
        { $set: { geoLocation: { coordinates: [long, lat] } } },
      );
      return await this.generateTokens(user._id.toString());
    } catch (error) {
      throw error;
    }
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

  async refreshToken(rfPayload: RefreshPayload): Promise<JwtPayload> {
    try {
      const refreshToken = await this.cacheManager.get(rfPayload._id);
      if (!refreshToken) {
        throw new UnauthorizedException('Refresh is not accepted');
      } else {
        return await this.generateTokens(rfPayload._id);
      }
    } catch (error) {
      throw error;
    }
  }

  async loginWithOAuth2(req, registerType: RegisterType): Promise<JwtPayload> {
    try {
      const user = req.user as User;
      const [userOAuth2, userNormal] = await Promise.all([
        this.userService.getOne({
          email: user.email,
          registerType: registerType,
        }),
        this.userService.getOne({
          email: user.email,
          registerType: RegisterType.NORMAL,
        }),
      ]);
      if (!userOAuth2 && !userNormal) {
        const newUser = await this.userService.createWithOAuth2(user);
        return await this.generateTokens(newUser._id.toString());
      } else if (userNormal) {
        throw new BadRequestException('Email has been used !');
      }
      const [long, lat] = [-73.856077, 40.848447];
      await this.userService.findOneAndUpdate(
        { _id: userOAuth2._id },
        { $set: { geoLocation: { coordinates: [long, lat] } } },
      );
      return await this.generateTokens(userOAuth2._id.toString());
    } catch (error) {
      throw error;
    }
  }

  async loginWithFacebook(req): Promise<JwtPayload> {
    try {
      return await this.loginWithOAuth2(req, RegisterType.FACEBOOK);
    } catch (error) {
      throw error;
    }
  }

  async loginWithGoogle(req): Promise<JwtPayload> {
    try {
      return await this.loginWithOAuth2(req, RegisterType.GOOGLE);
    } catch (error) {
      throw error;
    }
  }

  async resetCache(): Promise<boolean> {
    try {
      await this.cacheManager.reset();
      return true;
    } catch (error) {
      throw error;
    }
  }
}
