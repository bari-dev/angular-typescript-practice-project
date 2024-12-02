import { AllowNull, BelongsToMany, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript"
import { Post } from "./Post"
import { PostTag } from "./PostTag"
import { User } from "./User"

@Table
export class Tag extends Model<Tag>{
  @AllowNull(false)
  @Column
  name?: string

  @BelongsToMany(()=>Post, ()=>PostTag)
  posts: Post[] = []

  @ForeignKey(()=>User)
  @Column
  userId?: number

  @BelongsTo(()=>User)
  user?: User
}