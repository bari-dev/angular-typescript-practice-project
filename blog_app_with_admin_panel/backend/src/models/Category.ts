import { Table, Column, Model, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './User';


@Table
export class Category extends Model<Category> {

  @AllowNull(false)
  @Column({
    unique: true,
  })
  title?: string;

  @AllowNull(false)
  @Column
  slug?: string;

  @AllowNull(false)
  @ForeignKey(()=>User)
  @Column
  userId?: number;

  @BelongsTo(()=>User)
  user?: User
}