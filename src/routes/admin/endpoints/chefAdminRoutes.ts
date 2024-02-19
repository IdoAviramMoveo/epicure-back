import { Router } from "express";
import * as chefController from "../../../controllers/chefController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.post("/", chefController.createChef);
router.put("/set-chef-of-the-week/:id", chefController.setChefOfTheWeek);
router.put("/:id", chefController.updateChef);
router.delete("/:id", chefController.deleteChef);

export default router;
