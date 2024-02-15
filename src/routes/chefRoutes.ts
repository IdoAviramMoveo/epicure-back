import { Router } from "express";

import * as chefController from "../controllers/chefController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.get("/", chefController.getAllChefs);
router.get("/chef-of-the-week", chefController.getChefOfTheWeek);
router.put("/set-chef-of-the-week/:id", authenticateToken, chefController.setChefOfTheWeek);
router.get("/:id", chefController.getChefById);
router.get("/:id/with-restaurants", chefController.getChefWithRestaurants);
router.post("/", authenticateToken, chefController.createChef);
router.put("/:id", authenticateToken, chefController.updateChef);
router.delete("/:id", authenticateToken, chefController.deleteChef);

export default router;
