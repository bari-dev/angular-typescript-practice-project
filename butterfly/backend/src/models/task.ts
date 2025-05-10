import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import TaskList from "./tasklist";
import User from "./user";
import TaskUser from "./taskuser";

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

  static associate() {
    Task.belongsTo(TaskList, { foreignKey: 'tasklistId', as: 'tasklist' });

    Task.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

    Task.belongsToMany(User, {
      through: TaskUser,
      as: "users",
      foreignKey: "taskId"
    });

    Task.hasMany(TaskUser, {
      foreignKey: "taskId",
      as: "taskUsers"
    })
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
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    deadline: { type: DataTypes.DATE },
    taskListId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "TaskList", key: "id" },
      onDelete: "CASCADE",
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "User", key: "id" },
      onDelete: "CASCADE",
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "Task", 
    modelName: "Task",
  }
);

export default Task;
