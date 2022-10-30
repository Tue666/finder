import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginInput, RegisterInput } from '../../auth/dto/auth.dto';
import { throwIfNotExists } from '../../utils/model.utils';
import {
  FilterGetOneUser,
  MySettingInput,
  UpdateUserInput,
} from './dto/create-user.dto';
import { User } from './entities/user.entities';
import { UserModelType } from './schema/user.schema';
import bcrypt from 'bcrypt';
import { FilterQuery, UpdateQuery } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModelType) {}
  async createWithOAuth2(userGoogle: User): Promise<User> {
    try {
      const user = await this.userModel.create(userGoogle);
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async findOne(filter: FilterGetOneUser): Promise<User> {
    const user = await this.userModel.findOne(filter);
    throwIfNotExists(user, 'User not found');
    return user;
  }

  async getOne(filter: FilterGetOneUser): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne(filter);
      return user ? user : undefined;
    } catch (error) {
      throw error;
    }
  }

  async signIn(input: LoginInput): Promise<User> {
    try {
      const user = await this.findOne({ email: input.email });
      await this.isNotCorrectPassword(input.password, user.password);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signUp(register: RegisterInput): Promise<User> {
    try {
      if (register.password != register.confirmPassword) {
        throw new BadRequestException('Password not match');
      }
      const { password, email } = register;
      const userExisting = await this.getOne({ email });
      if (userExisting) {
        throw new BadRequestException('Email is existing');
      }
      const [user, hashPassword] = await Promise.all([
        this.userModel.create({ email }),
        this.hashPassword(password),
      ]);
      user.password = hashPassword;
      return user.save();
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      return hashPassword;
    } catch (error) {
      throw error;
    }
  }

  async isNotCorrectPassword(
    password: string,
    currentPassword: string,
  ): Promise<void> {
    const correct = await bcrypt.compare(password, currentPassword);
    if (!correct) {
      throw new UnauthorizedException('Password incorrect');
    }
  }

  async setResetCode(user: User, randomCode: string): Promise<void> {
    const userUpdate = new this.userModel(user);
    userUpdate.resetPasswordCode = await bcrypt.hash(randomCode, 12);
    await userUpdate.save();
  }

  async findOneAndUpdate(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>,
  ): Promise<User> {
    try {
      const user = await this.userModel.findOneAndUpdate(filter, update, {
        new: true,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(
    user: User,
    input: UpdateUserInput | MySettingInput,
  ): Promise<boolean> {
    try {
      const result = [].map((r: UpdateUserInput | MySettingInput) => {
        if (r && typeof r !== 'number' && !Array.isArray(r)) {
          console.log(r);
        }
      });
      const newUser = await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { $set: { mySetting: input } },
        { new: true },
      );
      throwIfNotExists(newUser, 'User not found to update');
      return true;
    } catch (error) {
      throw error;
    }
  }
}
