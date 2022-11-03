import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginInput, RegisterInput } from '../../auth/dto/auth.dto';
import { throwIfNotExists } from '../../utils/model.utils';
import {
  FilterGetAllUser,
  FilterGetOneUser,
  MySettingInput,
  UpdateUserInput,
} from './dto/create-user.dto';
import { MatchRequest, User, UserResult } from './entities/user.entities';
import { UserModelType } from './schema/user.schema';
import bcrypt from 'bcrypt';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { Constants } from '../../constants/constants';
import { PaginationInput } from '../common/dto/common.dto';
import { UserEmbeddedService } from '../user_embedded/user_embedded.service';
import { includesInObject } from '../../utils/utils';
import { LoggerService } from '../logger/logger.service';
import { ConversationService } from '../conversation/conversation.service';
import { UserHelper } from './helper/user.helper';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: UserModelType,
    private userEmbeddedService: UserEmbeddedService,
    private loggerService: LoggerService,
    private conversationService: ConversationService,
    private userHelper: UserHelper,
  ) {
    this.loggerService.setContext('UserService');
  }
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

  async getAllUser(
    pagination: PaginationInput,
    filter: FilterGetAllUser,
  ): Promise<UserResult> {
    try {
      const queryFilter = this.userHelper.buildQuery(filter);
      const [results, totalCount] = await Promise.all([
        this.userModel
          .find(queryFilter)
          .skip((pagination?.page - 1) * pagination?.size)
          .limit(pagination?.size),
        this.userModel.countDocuments(),
      ]);
      return { results, totalCount };
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
    feature: string,
  ): Promise<boolean> {
    try {
      let updateQuery = {};
      if (feature === Constants.CHANGE_SETTING) {
        updateQuery[feature] = input;
      } else {
        updateQuery = { ...input };
      }
      const newUser = await this.userModel.findOneAndUpdate(
        { _id: user._id },
        { $set: updateQuery },
        { new: true },
      );
      throwIfNotExists(newUser, 'User not found to update');
      return true;
    } catch (error) {
      throw error;
    }
  }

  async unlikeUser(user: User, user_id: string): Promise<boolean> {
    try {
      await this.userEmbeddedService.findOneAndUpdate(
        {
          user: user._id,
          count: { $lt: Constants.MAX_COUNT_IN_USER_EMBEDDED },
        },
        { $push: { unlikeUser: user_id }, $inc: { count: 1 } },
      );
      return true;
    } catch (error) {
      throw error;
    }
  }

  async likeUser(user_id: string, user: User): Promise<boolean> {
    try {
      const requestUser = await this.userModel.findOne({ _id: user_id });
      throwIfNotExists(requestUser, 'User not found');
      const isContainsInRequest = includesInObject<MatchRequest>(
        requestUser.matchRequest,
        'sender',
        user_id,
      );
      if (isContainsInRequest) {
        this.loggerService.log('User match request with request user');
        await this.conversationService.create({
          members: [user_id, requestUser._id],
        });
      } else {
        this.loggerService.log(
          `Request match request to ${requestUser.username}`,
        );
        requestUser.matchRequest.push({
          sender: user,
          createdAt: new Date(),
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
