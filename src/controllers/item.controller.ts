import { Request, Response } from "express";
import { ItemService } from "../services/item.service";

export class ItemController {
  constructor(private itemService: ItemService) {
    // this.itemService = new ItemService();
  }

  async uploadExcel(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file || Array.isArray(file)) {
        console.error("Invalid file uploaded:", file);
        res.status(400).send("Invalid file uploaded");
        return;
      }
      console.log("Importing data from file:", file.originalname);
      await this.itemService.importFromExcel(file);
      res.status(200).send("Data imported successfully");
    } catch (error) {
      console.error("Error importing data:", error);
      res.status(500).send("Internal server error");
    }
  }
  async getAllItems(req: Request, res: Response) {
    try {
      const items = await this.itemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      console.error("Error getting items:", error);
      res.status(500).send("Internal server error");
    }
  }

  async getSingleItem(req: Request, res: Response) {
    try {
      const itemId: string = req.params.id;
      const item = await this.itemService.getSingleItem(parseInt(itemId, 10));
      if (item !== null) {
        res.status(200).json(item);
      } else {
        res.status(404).send("Item not found");
      }
    } catch (error) {
      console.error("Error getting item:", error);
      res.status(500).send("Internal server error");
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const itemId = req.params.id;
      await this.itemService.deleteItem(itemId);
      res.status(200).send("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).send("Internal server error");
    }
  }
}
