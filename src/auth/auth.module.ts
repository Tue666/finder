import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { RtStrategy } from './strategies/jwt-rt.strategies';
import { AtStrategy } from './strategies/jwt-at.strategies';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthResolver, JwtService, RtStrategy, AtStrategy],
})
export class AuthModule {}
