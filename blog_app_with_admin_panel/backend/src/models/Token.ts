import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./User";


@Table
export class Token extends Model<Token>{
  @AllowNull(false)
  @Column
  token?: string

  @AllowNull(false)
  @Column({
    type: DataType.ENUM('activation', 'reset')
  })
  type?: 'activation | reset'

  @ForeignKey(()=>User)
  @AllowNull(false)
  @Column
  userId?: number

  @BelongsTo(()=>User)
  user?: User;
}