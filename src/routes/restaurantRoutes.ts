import { Router } from "express";
import * as restaurantController from "../controllers/restaurantController";

const router = Router();

router.get("/", restaurantController.getAllRestaurants);
router.get("/popular", restaurantController.getAllPopularRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:id/with-dishes", restaurantController.getRestaurantWithDishes);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
