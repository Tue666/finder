import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IJwtPayload, RefreshPayload } from '../entities/auth.entities';
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: IJwtPayload): RefreshPayload {
    try {
      const refreshToken = req
        .get('authorization')
        .replace('Bearer', '')
        .trim();
      return {
        _id: payload._id,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
