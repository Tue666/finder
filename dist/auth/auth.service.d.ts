import { JwtService } from '@nestjs/jwt';
import { User } from '../modules/user/entities/user.entities';
import { UserService } from '../modules/user/user.service';
import { LoginInput, RegisterInput, ResetPasswordInput } from './dto/auth.dto';
import { JwtPayload, RefreshPayload } from './entities/auth.entities';
import { Cache } from 'cache-manager';
import { MailService } from '../modules/mail/mail.service';
import { RegisterType } from '../constants/enum';
export declare class AuthService {
    private jwtService;
    private userService;
    private mailService;
    private cacheManager;
    constructor(jwtService: JwtService, userService: UserService, mailService: MailService, cacheManager: Cache);
    generateTokens(_id: string): Promise<JwtPayload>;
    changePassword(oldPassword: string, newPassword: string, confirmPassword: string, user: User): Promise<boolean>;
    resetPassword(input: ResetPasswordInput): Promise<boolean>;
    signIn(input: LoginInput): Promise<JwtPayload>;
    signInAsAdmin(email: string, password: string): Promise<JwtPayload>;
    signUp(register: RegisterInput): Promise<boolean>;
    forgotPassword(email: string): Promise<boolean>;
    deleteAccount(user: User): Promise<boolean>;
    confirmDeleteAccount(code: number, email: string): Promise<boolean>;
    refreshToken(rfPayload: RefreshPayload): Promise<JwtPayload>;
    loginWithOAuth2(req: any, registerType: RegisterType): Promise<JwtPayload>;
    loginWithFacebook(req: any): Promise<JwtPayload>;
    loginWithGoogle(req: any): Promise<JwtPayload>;
    resetCache(): Promise<boolean>;
}
