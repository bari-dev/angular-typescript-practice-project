import { Table, Column, Model, AllowNull, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { User } from './User';
import { Comment } from './Comment';
import { Tag } from './Tag';
import { PostTag } from './PostTag';

@Table
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @Column
  customId?: number

  @AllowNull(false)
  @Column
  title: string = ''

  @AllowNull(false)
  @Column
  content: string = ''

  @AllowNull(false)
  @Column({
    unique: true
  })
  slug: string = ''

  @ForeignKey(()=> User)
  @AllowNull(false)
  @Column
  userId?: number;

  @BelongsTo(()=>User)
  user?: User;

  @HasMany(()=>Comment)
  comments: Comment[] = [];

  @BelongsToMany(()=>Tag, ()=>PostTag)
  tags: Tag[] = []
}