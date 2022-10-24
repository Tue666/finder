import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { throwIfNotExists } from '../../utils/model.utils';
import { FilterGetOneUser } from './dto/create-user.dto';
import { User } from './entities/user.entities';
import { UserModelType } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModelType) {}
  async create(): Promise<boolean> {
    return false;
  }

  async findOne(filter: FilterGetOneUser): Promise<User> {
    const user = await this.userModel.findOne(filter);
    throwIfNotExists(user, 'User not found');
    return user;
  }
}
