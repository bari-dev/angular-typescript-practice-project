import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Task extends Model {
  public id!: number;
  public title!: string;
  public slug!: string;
  public description?: string;
  public completed!: boolean;
  public deadline?: Date;
  public taskListId!: number;
  public assignedToUserId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Task.belongsTo(models.TaskList, { foreignKey: 'taskListId', as: 'taskList' });
    Task.belongsTo(models.User, { foreignKey: 'assignedToUserId', as: 'assignedToUser' });
  }
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    taskListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TaskLists',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    assignedToUserId: {
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
    tableName: 'Tasks',
    modelName: 'Task',
  }
);

export default Task;
