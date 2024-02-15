import { Router } from "express";

import * as restaurantController from "../controllers/restaurantController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.get("/", restaurantController.getAllRestaurants);
router.get("/with-dishes", restaurantController.getAllRestaurantsWithDishes);
router.get("/popular", restaurantController.getAllPopularRestaurants);
router.put("/set-popular/:id", authenticateToken, restaurantController.setRestaurantAsPopular);
router.put("/unset-popular/:id", authenticateToken, restaurantController.unsetRestaurantAsPopular);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:id/with-dishes", restaurantController.getRestaurantWithDishes);
router.post("/", authenticateToken, restaurantController.createRestaurant);
router.put("/:id", authenticateToken, restaurantController.updateRestaurant);
router.delete("/:id", authenticateToken, restaurantController.deleteRestaurant);

export default router;
