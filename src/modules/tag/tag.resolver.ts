import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput, FilterGetAllTag } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { PaginationInput } from '../common/dto/common.dto';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => [Tag], { name: 'tag' })
  findAll(
    @Args('pagination', { type: () => PaginationInput, nullable: true })
    pagination: PaginationInput,
    @Args('filter', { type: () => FilterGetAllTag, nullable: true })
    filter: FilterGetAllTag,
  ) {
    return this.tagService.findAll(pagination, filter);
  }

  @Query(() => Tag, { name: 'tag' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findOne(id);
  }

  @Mutation(() => Tag)
  updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => Tag)
  removeTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.remove(id);
  }
}
