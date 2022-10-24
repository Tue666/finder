export interface ITag extends IEntity {
  name: string;
}
export type ITagCreate = IEntityInput<ITag, null>;
