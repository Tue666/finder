import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  mappingDataDietaryPreference,
  mappingDataEducation,
  mappingDataPassion,
  mappingDataPersonalityType,
  mappingDataPets,
  mappingDataSmokeQuestion,
  mappingDataZodiac,
} from "../../pattern/mapping.tinder";
import { FilterBuilder } from "../../utils/filter.query";
import { PaginationInput } from "../common/dto/common.dto";
import {
  CreateTagInput,
  FilterGetAllTag,
  UpdateTagInput,
} from "./dto/create-tag.input";
import { Tag, TagResult } from "./entities/tag.entity";
import { TagModelType } from "./schema/tag.schema";

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: TagModelType) {}
  async create(input: CreateTagInput): Promise<boolean> {
    const tag = await this.tagModel.create(input);
    return tag ? true : false;
  }

  async delete(tag_id: string): Promise<boolean> {
    try {
      const tag = await this.tagModel.findOneAndUpdate(
        { _id: tag_id },
        { $set: { isDeleted: true } }
      );
      return tag ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async update(_id: string, input: UpdateTagInput): Promise<boolean> {
    try {
      const tag = await this.tagModel.findOneAndUpdate({ _id }, input);
      await tag.save();
      return tag ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async findAll(
    pagination: PaginationInput,
    filter: FilterGetAllTag
  ): Promise<TagResult> {
    const [queryFilter, querySort] = new FilterBuilder<Tag>()
      .setFilterItem(
        "type",
        {
          $eq: filter?.type,
        },
        filter?.type
      )
      .setFilterItem("_id", { $in: filter?.ids }, filter?.ids)
      .setFilterItem(
        "parentType",
        { $eq: filter?.parentType },
        filter?.parentType
      )
      .setSortItem("createdAt", 1)
      .buildQuery();
    const [results, totalCount] = await Promise.all([
      this.tagModel
        .find(queryFilter)
        .skip((pagination?.page - 1) * pagination?.size)
        .limit(pagination?.size)
        .sort(querySort),
      this.tagModel.countDocuments(queryFilter),
    ]);
    return { results, totalCount };
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  async createTagPassion(): Promise<boolean> {
    const tags = mappingDataPassion();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async createTagZodiac(): Promise<boolean> {
    const tags = mappingDataZodiac();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async createTagPersonality(): Promise<boolean> {
    const tags = mappingDataPersonalityType();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async createTagDiet(): Promise<boolean> {
    const tags = mappingDataDietaryPreference();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async createTagPet(): Promise<boolean> {
    const tags = mappingDataPets();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async createTagEducation(): Promise<boolean> {
    const tags = mappingDataEducation();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async createTagSmokeQuestion(): Promise<boolean> {
    const tags = mappingDataSmokeQuestion();
    await this.tagModel.insertMany(tags);
    return true;
  }

  async deleteMany(): Promise<boolean> {
    await this.tagModel.deleteMany({ parentType: "Life style" });
    return true;
  }
}
