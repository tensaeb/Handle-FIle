import { DataTypes, Model, Sequelize } from "sequelize";
import { sequelize } from "../../config";

export interface ItemAttributes {
  id?: number;
  item_no?: string | null;
  description?: string | null;
  rate?: number | null;
  qty?: number | null;
  amount?: number | null;
}

export class Item extends Model<ItemAttributes> implements ItemAttributes {
  public id?: number;
  public item_no?: string;
  public description?: string;
  public rate?: number;
  public qty?: number;
  public amount?: number;

  public static readonly sequelize: Sequelize = sequelize;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
