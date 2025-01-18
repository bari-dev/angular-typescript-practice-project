import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";
import Task from "./task";

class TaskList extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    // TaskList belongs to User (creator of the task list)
    TaskList.belongsTo(User, { foreignKey: "creatorId", as: "creator" });

    // TaskList has many Tasks (one-to-many)
    TaskList.hasMany(Task, { foreignKey: "taskListId", as: "tasks" });
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
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
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
    tableName: "TaskList",
    modelName: "TaskList",
  }
);

export default TaskList;
