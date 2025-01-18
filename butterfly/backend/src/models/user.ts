import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import TaskList from "./tasklist";
import Task from "./task";
import TaskUser from "./taskuser";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    // User has many TaskLists (one-to-many)
    User.hasMany(TaskList, { foreignKey: "creatorId", as: "tasklists" });

    // User has many Tasks through TaskUser (many-to-many)
    User.belongsToMany(Task, {
      through: TaskUser,
      foreignKey: "creatorId",
      as: "tasks",
    });
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
