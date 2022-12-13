import { PaginationInput } from '../common/dto/common.dto';
import { CreateTagInput, FilterGetAllTag, UpdateTagInput } from './dto/create-tag.input';
import { TagResult } from './entities/tag.entity';
import { TagService } from './tag.service';
export declare class TagResolver {
    private readonly tagService;
    constructor(tagService: TagService);
    createTag(createTagInput: CreateTagInput): Promise<boolean>;
    updateTag(tag_id: string, input: UpdateTagInput): Promise<boolean>;
    deleteTag(tag_id: string): Promise<boolean>;
    getAllTag(pagination: PaginationInput, filter: FilterGetAllTag): Promise<TagResult>;
    createMultiTag(): Promise<boolean>;
}
