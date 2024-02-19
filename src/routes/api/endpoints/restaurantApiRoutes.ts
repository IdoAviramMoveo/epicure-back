import { Router } from "express";
import * as restaurantController from "../../../controllers/restaurantController";

const router = Router();

router.get("/", restaurantController.getAllRestaurants);
router.get("/with-dishes", restaurantController.getAllRestaurantsWithDishes);
router.get("/popular", restaurantController.getAllPopularRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.get("/:id/with-dishes", restaurantController.getRestaurantWithDishes);

export default router;
