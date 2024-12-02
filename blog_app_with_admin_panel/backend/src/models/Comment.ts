import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from './User';
import { Post } from "./Post";


@Table
export class Comment extends Model<Comment>{
  @AllowNull(false)
  @Column
  content: string = ''


  @ForeignKey(()=> User)
  @AllowNull(false)
  @Column
  userId?: number

  @BelongsTo(()=>User)
  user?: User

  @ForeignKey(()=>Post)
  @AllowNull(false)
  @Column
  postId?: number

  @BelongsTo(()=>Post)
  post?: Post
}