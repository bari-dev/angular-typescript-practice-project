import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import TaskList from "./tasklist";
import Task from "./task";
import TaskUser from "./taskuser";
import TasklistMember from "./tasklistMembers";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    User.hasMany(TaskList, { foreignKey: "creatorId", as: "tasklists" });

    User.belongsToMany(TaskList, {
      through: TasklistMember,
      foreignKey: "memberId",
      as: "userTasklists",
    });

    User.hasMany(TasklistMember, {
      foreignKey: "memberId",
      as: "tasklistMembers"
    })

    User.belongsToMany(Task, {
      through: TaskUser,
      foreignKey: "userId",
      as: "tasks",
    });

    User.hasMany(TaskUser, {
      foreignKey: "userId",
      as: "userTasks"
    })
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
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "User",
    modelName: "User",
  }
);

export default User;
