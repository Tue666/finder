import { GenderEnum } from '../../../constants/enum';
import { ITag } from '../../tag/interfaces/tag';
import { User } from '../entities/user.entities';

export interface IUser extends IEntity {
  username: string;
  email: string;
  gender: GenderEnum;
  phoneNumber: string;
  password: string;
  address: string;
  birthDays: Date;
  images: string[];
  matched: string[];
  matchRequest: IMatchRequest[];
  tags: ITag[] | string[];
  showMeTinder: boolean;
  getLocation: IGeoLocation;
  lastActive: Date;
  // query: Object;
}

export interface IMatchRequest {
  senderId: string | User;
  createdAt: Date;
}

export interface IGeoLocation {
  type: string;
  coordinates: number[];
}
