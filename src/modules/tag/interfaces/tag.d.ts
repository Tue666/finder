import { TagType } from '../../../constants/enum';

export interface ITag extends IEntity {
  name: string;
  type: TagType;
  parentType: TagType;
}
export type ITagCreate = IEntityInput<ITag, null>;
