import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async generateTokens(_id: string, userName: string): Promise<any> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          _id: _id,
          username: userName,
        },
        {
          secret: process.env.JWT_ACCESS_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        },
      ),
      this.jwtService.signAsync(
        {
          username: userName,
        },
        {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET,
          expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
        },
      ),
    ]);
    return [at, rt];
  }
}
