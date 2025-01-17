import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import { TasklistCreator } from '../interfaces/tasklistWithUser';

class TaskList extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
  public userId!: number;
  public creator!: TasklistCreator;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    TaskList.belongsTo(User, { foreignKey: 'userId', as: 'creator' });
  }
}

TaskList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    tableName: 'TaskLists',
    modelName: 'TaskList',
  }
);

export default TaskList;