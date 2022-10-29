import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginInput, RegisterInput } from '../../auth/dto/auth.dto';
import { throwIfNotExists } from '../../utils/model.utils';
import { FilterGetOneUser } from './dto/create-user.dto';
import { User } from './entities/user.entities';
import { UserModelType } from './schema/user.schema';
import bcrypt from 'bcrypt';
import { FilterQuery, UpdateQuery } from 'mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: UserModelType) {}
  async createWithGoogle(userGoogle: User): Promise<boolean> {
    try {
      const user = await this.userModel.create(userGoogle);
      return user ? true : false;
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
    const user = await this.userModel.findOne(filter);
    return user ? user : undefined;
  }

  async signIn(input: LoginInput): Promise<User> {
    const user = await this.findOne({ email: input.email });
    await this.isNotCorrectPassword(input.password, user.password);
    return user;
  }

  async signUp(register: RegisterInput): Promise<User> {
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
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
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
}
