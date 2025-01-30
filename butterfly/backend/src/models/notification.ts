import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user";

class Notification extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Notification.belongsTo(User, { foreignKey: "userId", as: "user" });
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "User", key: "id" },
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM('info', 'success', 'error'),
      allowNull: false,
      defaultValue: 'info'
    },
    read: { type: DataTypes.BOOLEAN, defaultValue: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: "Notification",
    modelName: "Notification",
  }
);

export default Notification;
