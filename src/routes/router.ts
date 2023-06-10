import express from "express";
import multer from "multer";
import { ItemController } from "../controllers/item.controller";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

export function itemRoutes(itemController: ItemController): express.Router {
  router.post(
    "/",
    upload.single("file"),
    itemController.uploadExcel.bind(itemController)
  );
  router.get("/", itemController.getAllItems.bind(itemController));
  router.get("/:itemId", itemController.getSingleItem.bind(itemController));
  router.delete("/:itemId", itemController.deleteItem.bind(itemController));
  return router;
}
