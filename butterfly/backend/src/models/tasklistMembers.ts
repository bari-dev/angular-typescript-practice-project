import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";
import TaskList from "./tasklist";

class TasklistMember extends Model {
  public id!: number;
  public memberId!: number;
  public tasklistId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    TasklistMember.belongsTo(User, {
      foreignKey: "memberId",
      as: "member"
    })

    TasklistMember.belongsTo(TaskList, {
      foreignKey: "tasklistId",
      as: "tasklist"
    })
  }
}

TasklistMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { 
        model: "User",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    tasklistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Tasklist", key: "id" },
      onDelete: "CASCADE",
    },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "TasklistMember",
    modelName: "TasklistMember",
    indexes: [
      {
        unique: true,
        fields: ["memberId", "tasklistId"],
      },
    ],
  }
);

export default TasklistMember;
