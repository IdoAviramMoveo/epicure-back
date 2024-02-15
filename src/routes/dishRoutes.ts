import { Router } from "express";

import * as dishController from "../controllers/dishController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.get("/", dishController.getAllDishes);
router.get("/signature", dishController.getAllSignatureDishes);
router.put("/set-signature/:id", authenticateToken, dishController.setDishAsSignature);
router.put("/unset-signature/:id", authenticateToken, dishController.unsetDishAsSignature);
router.get("/ingredient/:ingredient", dishController.getDishesByIngredient);
router.get("/:id", dishController.getDishById);
router.post("/", authenticateToken, dishController.createDish);
router.put("/:id", authenticateToken, dishController.updateDish);
router.delete("/:id", authenticateToken, dishController.deleteDish);

export default router;
