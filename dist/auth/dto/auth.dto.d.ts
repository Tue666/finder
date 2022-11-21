import { GeoLocationInput } from '../../modules/user/dto/create-user.dto';
export declare class LoginInput {
    email: string;
    password: string;
    geoLocation: GeoLocationInput;
}
export declare class RegisterInput {
    email: string;
    password: string;
    confirmPassword: string;
}
export declare class ResetPasswordInput {
    email: string;
    code: string;
    password: string;
    confirmPassword: string;
}
