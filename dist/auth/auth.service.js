"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../modules/user/user.service");
const cache_manager_1 = require("cache-manager");
const mail_service_1 = require("../modules/mail/mail.service");
const enum_1 = require("../constants/enum");
const constants_1 = require("../constants/constants");
const create_user_dto_1 = require("../modules/user/dto/create-user.dto");
const utils_1 = require("../utils/utils");
let AuthService = class AuthService {
    constructor(jwtService, userService, mailService, cacheManager) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.mailService = mailService;
        this.cacheManager = cacheManager;
    }
    async generateTokens(_id) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({ _id }, {
                secret: process.env.JWT_ACCESS_TOKEN_SECRET,
                expiresIn: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
            }),
            this.jwtService.signAsync({ _id }, {
                secret: process.env.JWT_REFRESH_TOKEN_SECRET,
                expiresIn: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
            }),
        ]);
        await this.cacheManager.set(_id, refreshToken, {
            ttl: constants_1.Constants.REFRESH_TOKEN_TTL,
        });
        return { accessToken, refreshToken };
    }
    async changePassword(oldPassword, newPassword, confirmPassword, user) {
        if (newPassword != confirmPassword) {
            throw new common_1.BadRequestException('Mật khẩu không khớp');
        }
        return await this.userService.changePassword(oldPassword, newPassword, user);
    }
    async signIn(input) {
        try {
            const [long, lat] = [106.6804281, 10.8292385];
            input.geoLocation = new create_user_dto_1.GeoLocationInput();
            input.geoLocation.coordinates = [long, lat];
            const user = await this.userService.signIn(input);
            return await this.generateTokens(user._id.toString());
        }
        catch (error) {
            throw error;
        }
    }
    async signInAsAdmin(email, password) {
        try {
            const user = await this.userService.signInAsAdmin(email, password);
            if (user.role === enum_1.RoleEnum.USER) {
                throw new common_1.ForbiddenException('Please login with admin account');
            }
            return await this.generateTokens(user._id.toString());
        }
        catch (error) {
            throw error;
        }
    }
    async signUp(register) {
        const [user, token] = await Promise.all([
            this.userService.signUp(register),
            this.mailService.generateToken(register.email),
        ]);
        const urlConfirm = `${process.env.FRONT_END_URL_CONFIRM_MAIL}?token=${token}`;
        const html = urlConfirm;
        await this.mailService.sendMail(user.email, constants_1.Constants.VERIFY_ACCOUNT_SUBJECT, html);
        return true;
    }
    async forgotPassword(email) {
        try {
            const user = await this.userService.getOne({ email });
            if (!user) {
                throw new common_1.BadRequestException('Email không tồn tại. Vui lòng nhập lại email');
            }
            const [ttlResetCode, cacheKey, code] = [
                60 * 15,
                `reset_code_password_${user.email}`,
                (0, utils_1.randomCode)(),
            ];
            const html = code.toString();
            await Promise.all([
                this.cacheManager.set(cacheKey, utils_1.randomCode, ttlResetCode),
                this.mailService.sendMail(user.email, 'Reset mật khẩu', html),
            ]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAccount(user) {
        try {
            const [ttlResetCode, cacheKey, code] = [
                60 * 15,
                `delete_account_code_${user.email}`,
                (0, utils_1.randomCode)(),
            ];
            const html = code.toString();
            await Promise.all([
                this.cacheManager.set(cacheKey, code, ttlResetCode),
                this.mailService.sendMail(user.email, 'Xóa tài khoản', html),
            ]);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async confirmDeleteAccount(code, email) {
        try {
            const [user, cacheValue] = await Promise.all([
                this.userService.findOne({ email }),
                this.cacheManager.get(`delete_account_code_${email}`),
            ]);
            if (!cacheValue) {
                throw new common_1.NotFoundException('Code nhập vào đã hết hạn hoặc không khả dụng');
            }
            else {
                if (cacheValue != code) {
                    throw new common_1.BadRequestException('Code không đúng. Vui lòng nhập lại');
                }
                else {
                    await Promise.all([
                        this.userService.findOneAndUpdate({ _id: user._id }, { $set: { isDeleted: true } }),
                        this.cacheManager.del(`delete_account_code_${email}`),
                    ]);
                    return true;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async refreshToken(rfPayload) {
        try {
            const refreshToken = await this.cacheManager.get(rfPayload._id);
            if (!refreshToken) {
                throw new common_1.UnauthorizedException('Refresh is not accepted');
            }
            else {
                return await this.generateTokens(rfPayload._id);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async loginWithOAuth2(req, registerType) {
        try {
            const user = req.user;
            const [userOAuth2, userNormal] = await Promise.all([
                this.userService.getOne({
                    email: user.email,
                    registerType: registerType,
                }),
                this.userService.getOne({
                    email: user.email,
                    registerType: enum_1.RegisterType.NORMAL,
                }),
            ]);
            if (!userOAuth2 && !userNormal) {
                const newUser = await this.userService.createWithOAuth2(user);
                return await this.generateTokens(newUser._id.toString());
            }
            else if (userNormal) {
                throw new common_1.BadRequestException('Email has been used !');
            }
            const [long, lat] = [-73.856077, 40.848447];
            await this.userService.findOneAndUpdate({ _id: userOAuth2._id }, { $set: { geoLocation: { coordinates: [long, lat] } } });
            return await this.generateTokens(userOAuth2._id.toString());
        }
        catch (error) {
            throw error;
        }
    }
    async loginWithFacebook(req) {
        try {
            return await this.loginWithOAuth2(req, enum_1.RegisterType.FACEBOOK);
        }
        catch (error) {
            throw error;
        }
    }
    async loginWithGoogle(req) {
        try {
            return await this.loginWithOAuth2(req, enum_1.RegisterType.GOOGLE);
        }
        catch (error) {
            throw error;
        }
    }
    async resetCache() {
        try {
            await this.cacheManager.reset();
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService,
        mail_service_1.MailService, typeof (_a = typeof cache_manager_1.Cache !== "undefined" && cache_manager_1.Cache) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map