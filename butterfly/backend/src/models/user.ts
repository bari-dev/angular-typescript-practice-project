import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import TaskList from './tasklist';
import Task from './task';

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  salesforce: any;
  instanceUrl: string | undefined;
  accessToken: string | undefined;

  static associate() {
    User.hasMany(TaskList, { foreignKey: 'userId', as: 'tasklists' });
    // User.belongsToMany(TaskList, {
    //   through: models.TaskListUser,
    //   foreignKey: 'userId',
    // });
    User.hasMany(Task, { foreignKey: 'assignedToUserId' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
  }
);

export default User;
