import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLObjectID } from 'graphql-scalars';
import { hasRoles } from '../../common/decorators/role.decorators';
import { AtGuard } from '../../common/guard/at.guard';
import { RolesGuard } from '../../common/guard/role.guard';
import { RoleEnum } from '../../constants/enum';
import { PaginationInput } from '../common/dto/common.dto';
import {
  CreateTagInput,
  FilterGetAllTag,
  UpdateTagInput,
} from './dto/create-tag.input';
import { Tag, TagResult } from './entities/tag.entity';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Boolean)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  createTag(@Args('input') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  updateTag(
    @Args('tag_id', { type: () => GraphQLObjectID }) tag_id: string,
    @Args('input', { type: () => UpdateTagInput }) input: UpdateTagInput,
  ): Promise<boolean> {
    return this.tagService.update(tag_id, input);
  }

  @Mutation(() => Boolean)
  @UseGuards(AtGuard, RolesGuard)
  @hasRoles(RoleEnum.ADMIN)
  deleteTag(
    @Args('tag_id', { type: () => GraphQLObjectID }) tag_id: string,
  ): Promise<boolean> {
    return this.tagService.delete(tag_id);
  }

  @Query(() => TagResult)
  getAllTag(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('filter', { type: () => FilterGetAllTag, nullable: true })
    filter: FilterGetAllTag,
  ): Promise<TagResult> {
    return this.tagService.findAll(pagination, filter);
  }

  @Query(() => Boolean)
  async createMultiTag(): Promise<boolean> {
    await Promise.all([
      this.tagService.createTagPassion(),
      this.tagService.createTagDiet(),
      this.tagService.createTagEducation(),
      this.tagService.createTagPersonality(),
      this.tagService.createTagZodiac(),
      this.tagService.createTagPet(),
      this.tagService.createTagSmokeQuestion(),
    ]);
    return true;
  }
}
