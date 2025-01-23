import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";
import Task from "./task";
import TasklistMember from "./tasklistMembers";

class TaskList extends Model {
  public id!: number;
  public name!: string;
  public slug!: string;
  public creatorId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    TaskList.belongsTo(User, { foreignKey: "creatorId", as: "creator" });
    TaskList.hasMany(Task, { foreignKey: "taskListId", as: "tasks" });

    TaskList.belongsToMany(User, {
      through: TasklistMember,
      foreignKey: "tasklistId",
      as: "users"
    });

    TaskList.hasMany(TasklistMember, {
      foreignKey: "tasklistId",
      as: "tasklistMembers"
    })
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
