import { Router } from "express";
import * as chefController from "../controllers/chefController";

const router = Router();

router.get("/", chefController.getAllChefs);
router.get("/:id", chefController.getChefById);
router.get("/:id/with-restaurants", chefController.getChefWithRestaurants);
router.post("/", chefController.createChef);
router.put("/:id", chefController.updateChef);
router.delete("/:id", chefController.deleteChef);

export default router;
