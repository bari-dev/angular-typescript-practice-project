import { Table, Column, Model, AllowNull, BeforeSave, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import { Post } from './Post';
import { Comment } from './Comment';
import { Token } from './Token';
import { Category } from './Category';
import { Tag } from './Tag';

@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column
  name: string = '';

  @AllowNull(false)
  @Column({
    unique: true
  })
  email: string = '';

  @AllowNull(false)
  @Column
  password: string = '';

  @HasMany(()=>Post)
  posts: Post[] = []

  @HasMany(()=>Comment)
  comments: Comment[] = [];

  @HasMany(()=>Token)
  tokens: Token[] = []

  @HasMany(()=>Category)
  categories: Category[] = []

  @HasMany(()=>Tag)
  tags: Tag[] = []

  // Hook to encrypt password
  @BeforeSave
  static async hashPassword(instance: User) {
    if (instance.password) {
      const salt = await bcrypt.genSalt(10);
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  // Method to compare passwords
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
