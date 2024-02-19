import { Router } from "express";
import * as restaurantController from "../../../controllers/restaurantController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);

router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);
router.put("/set-popular/:id", restaurantController.setRestaurantAsPopular);
router.put("/unset-popular/:id", restaurantController.unsetRestaurantAsPopular);

export default router;
