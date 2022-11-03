import { User } from '../../user/entities/user.entities';

export interface IUserEmbedded extends IEntity {
  user: string | User;
  count: number;
  unlikeUser: string[];
}
