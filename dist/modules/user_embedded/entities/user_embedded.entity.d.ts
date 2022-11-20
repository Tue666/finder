import { User } from '../../user/entities/user.entities';
import { IUserEmbedded } from '../interfaces/user_embedded';
export declare class UserEmbedded implements IUserEmbedded {
    _id?: string;
    user: User;
    count: number;
    unlikeUser: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
