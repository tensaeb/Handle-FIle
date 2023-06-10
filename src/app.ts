import bodyParser from "body-parser";
import express, { Application } from "express";
import { ItemService } from "./services/item.service";
import { ItemController } from "./controllers/item.controller";
import { itemRoutes } from "./routes/router";
import { sequelize } from "../config";
import cors from "cors";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.connectDatabase();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors()); // Enable CORS middleware
  }

  private routes(): void {
    const itemService = new ItemService(sequelize);
    const itemController = new ItemController(itemService);
    const itemRouter = itemRoutes(itemController);
    this.app.use("/api/item", itemRouter);
  }
  private connectDatabase(): void {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to database");
      })
      .catch((err) => {
        console.error("Unable to connect to database:", err);
      });
  }
}

export default new App().app;
