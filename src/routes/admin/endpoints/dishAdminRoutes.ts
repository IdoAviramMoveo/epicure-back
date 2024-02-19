import { Router } from "express";
import * as dishController from "../../../controllers/dishController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.post("/", dishController.createDish);
router.put("/:id", dishController.updateDish);
router.delete("/:id", dishController.deleteDish);
router.put("/set-signature/:id", dishController.setDishAsSignature);
router.put("/unset-signature/:id", dishController.unsetDishAsSignature);

export default router;
