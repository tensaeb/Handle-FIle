import { DataTypes, Model, Sequelize } from "sequelize";
import { Item } from "../interfaces/item.interface";

export function initItemModel(sequelize: Sequelize) {
  Item.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      item_no: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      rate: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      qty: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
    },
    {
      tableName: "items",
      sequelize,
    }
  );
}
