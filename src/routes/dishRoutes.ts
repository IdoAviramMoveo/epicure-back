import { Router } from "express";
import * as dishController from "../controllers/dishController";

const router = Router();

router.get("/", dishController.getAllDishes);
router.get("/signature", dishController.getAllSignatureDishes);
router.put("/set-signature/:id", dishController.setDishAsSignature);
router.put("/unset-signature/:id", dishController.unsetDishAsSignature);
router.get("/ingredient/:ingredient", dishController.getDishesByIngredient);
router.get("/:id", dishController.getDishById);
router.post("/", dishController.createDish);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);

export default router;
