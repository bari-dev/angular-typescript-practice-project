import { DataTypes, Model, Optional } from 'sequelize';
import { Sequelize } from 'sequelize';
import sequelizeConnection from '../config/database';
import User from '../interfaces/user';

interface UserCreationAttributes extends Optional<User, 'id'> {}

class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

const User = sequelizeConnection.define<UserModel>('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,
});


export default User;