import { Router } from "express";
import * as chefController from "../../../controllers/chefController";

const router = Router();

router.get("/", chefController.getAllChefs);
router.get("/chef-of-the-week", chefController.getChefOfTheWeek);
router.get("/:id", chefController.getChefById);
router.get("/:id/with-restaurants", chefController.getChefWithRestaurants);

export default router;
