import { Router } from "express";
import * as restaurantController from "../controllers/restaurantController";

const router = Router();

router.get("/", restaurantController.getAllRestaurants);
router.get("/with-dishes", restaurantController.getAllRestaurantsWithDishes);
router.get("/popular", restaurantController.getAllPopularRestaurants);
router.put("/set-popular/:id", restaurantController.setRestaurantAsPopular);
router.put("/unset-popular/:id", restaurantController.unsetRestaurantAsPopular);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:id/with-dishes", restaurantController.getRestaurantWithDishes);
router.post("/", restaurantController.createRestaurant);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);

export default router;
