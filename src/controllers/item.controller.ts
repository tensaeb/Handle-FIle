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
}
