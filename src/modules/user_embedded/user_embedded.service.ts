import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { UserEmbedded } from './entities/user_embedded.entity';
import { UserEmbeddedModelType } from './schema/user_embedded.schema';

@Injectable()
export class UserEmbeddedService {
  constructor(
    @InjectModel(UserEmbedded.name)
    private userEmbeddedModel: UserEmbeddedModelType,
  ) {}

  async findOneAndUpdate(
    filter: FilterQuery<UserEmbedded>,
    update: UpdateQuery<UserEmbedded>,
  ): Promise<boolean> {
    try {
      return this.userEmbeddedModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true,
      });
    } catch (error) {
      throw error;
    }
  }
}
