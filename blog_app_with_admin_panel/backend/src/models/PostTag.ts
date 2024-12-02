import { Column, Table, Model, ForeignKey, AllowNull } from 'sequelize-typescript';
import { Post } from './Post';
import { Tag } from './Tag';

@Table
export class PostTag extends Model<PostTag>{
  @ForeignKey(()=>Post)
  @AllowNull(false)
  @Column
  postId?: number;

  @ForeignKey(()=>Tag)
  @AllowNull(false)
  @Column
  tagId?: number;
}