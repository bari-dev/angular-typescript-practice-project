import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";
import Task from "./task";

class TaskUser extends Model {
  public id!: number;
  public userId!: number;
  public taskId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    TaskUser.belongsTo(User, {
      foreignKey: "userId",
      as: "assignedUser"
    })

    TaskUser.belongsTo(Task, {
      foreignKey: "taskId",
      as: "task"
    })
  }
}

TaskUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "User", key: "id" },
      onDelete: "CASCADE",
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Task", key: "id" },
      onDelete: "CASCADE",
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "TaskUser",
    modelName: "TaskUser",
    indexes: [
      {
        unique: true,
        fields: ["userId", "taskId"],
      },
    ],
  }
);

export default TaskUser;
