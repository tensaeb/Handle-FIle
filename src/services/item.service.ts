import * as xlsx from "xlsx";
import { Item, ItemAttributes } from "../interfaces/item.interface";
import { Sequelize } from "sequelize";
import { initItemModel } from "../models/item.model";

export class ItemService {
  private sequelize: Sequelize;
  private items: Item[] = [];

  constructor(sequelize: Sequelize) {
    // Initialize Sequelize
    this.sequelize = sequelize;

    // Initialize the Item model
    initItemModel(this.sequelize);
  }
  public async importFromExcel(file: Express.Multer.File) {
    console.log("Starting import process...");

    // Create a new workbook and read the Excel file
    const workbook = xlsx.readFile(file.path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data: any[] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    //Remove the header row
    data.shift();

    //Map the data to Item objects
    const items: ItemAttributes[] = data.map((row: any) => {
      const itemNo =
        row[0] !== null && row[0] !== undefined ? row[0].toString() : null;
      const description =
        row[1] !== null && row[1] !== undefined ? row[1].toString() : null;
      const qty =
        row[3] !== null && row[3] !== undefined ? parseFloat(row[3]) : null;
      const rate =
        row[4] !== null && row[4] !== undefined ? parseFloat(row[4]) : null;
      const amount =
        row[5] !== null && row[5] !== undefined ? parseFloat(row[5]) : null;

      return {
        item_no: itemNo,
        description: description,
        qty: qty !== null && !isNaN(qty) ? qty : null,
        rate: rate !== null && !isNaN(rate) ? rate : null,
        amount: amount !== null && !isNaN(amount) ? amount : null,
      };
    });

    // Insert the data into the database using Sequelize
    try {
      // Check if the table is already populated
      const isTablePopulated = await Item.findOne();

      // Replace the data if the table is already populated
      if (isTablePopulated) {
        await Item.destroy({ truncate: true });
        console.log("Existing data deleted.");
      }
      await Item.bulkCreate(items);
      console.log("Data inserted Successfully");
    } catch (error: any) {
      throw new Error(`Error Inserting Data: ${error.message}`);
    }
  }

  public async getAllItems(): Promise<Item[]> {
    try {
      const items: Item[] = await Item.findAll();
      return items;
    } catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  }
  async getSingleItem(itemId: number): Promise<Item | null> {
    const item = this.items.find((item) => item.id === itemId);
    return item ? item : null;
  }

  async deleteItem(itemId: string | number): Promise<void> {
    const index = this.items.findIndex((item) => item.id === itemId);
    if (index !== -1) {
      this.items.splice(index, 1);
    } else {
      throw new Error(`Item with ID ${itemId} not found`);
    }
  }
}
