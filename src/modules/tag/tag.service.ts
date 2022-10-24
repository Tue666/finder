import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationInput } from '../common/dto/common.dto';
import {
  CreateTagInput,
  FilterGetAllTag,
  TagResult,
} from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';
import { TagModelType } from './schema/tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: TagModelType) {}
  async create(input: CreateTagInput): Promise<boolean> {
    const tag = await this.tagModel.create(input);
    return tag ? true : false;
  }

  async findAll(
    pagination: PaginationInput,
    filter: FilterGetAllTag,
  ): Promise<TagResult> {
    const queryFilter = {};
    const [results, totalCount] = await Promise.all([
      this.tagModel
        .find(queryFilter)
        .skip((pagination.page - 1) * pagination.size)
        .limit(pagination.size),
      this.tagModel.countDocuments(queryFilter),
    ]);
    return { results, totalCount };
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
