import { Router } from "express";
import * as dishController from "../controllers/dishController";

const router = Router();

router.get("/", dishController.getAllDishes);
router.get("/signature", dishController.getAllSignatureDishes);
router.get("/ingredient/:ingredient", dishController.getDishesByIngredient);
router.get("/:id", dishController.getDishById);
router.post("/", dishController.createDish);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

export default router;
