import { Router } from "express";
import * as restaurantController from "../../../controllers/restaurantController";

const router = Router();

/**
 * @api {get} /api/restaurants Request All Restaurants
 * @apiName GetAllRestaurants
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiDescription Retrieves all restaurants, including their chef's title.
 *
 * @apiSuccess {Object[]} restaurants Array of restaurant objects.
 * @apiSuccess {String} restaurants._id Restaurant unique ID.
 * @apiSuccess {String} restaurants.title Restaurant title.
 * @apiSuccess {String} restaurants.image URL to the image of the restaurant.
 * @apiSuccess {Object[]} restaurants.dishes An array with all the ID's of all the restaurant's dishes.
 * @apiSuccess {Object} restaurants.chef Chef object including the chef's id and title.
 * @apiSuccess {Number} restaurants.rating Restaurant rating.
 * @apiSuccess {Boolean} restaurants.isPopular Whether the restaurant is marked as popular.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "65c1eae28d7ed388233c194b",
 *         "title": "Claro",
 *         "image": "url_to_image_of_claro.png",
 *         "chef": {
 *           "_id": "65c0edfb8d7ed388231181f5",
 *           "title": "Ran Shmueli"
 *         },
 *         "rating": 4,
 *         "dishes": [
 *           "65c0eda88d7ed3882311713f",
 *           "65c1ff798d7ed388233fbd5d"
 *         ],
 *         "isPopular": true
 *       }
 *     ]
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "An unexpected error occurred"
 *     }
 */
router.get("/", restaurantController.getAllRestaurants);

/**
 * @api {get} /api/restaurants/with-dishes Request All Restaurants with Dishes
 * @apiName GetAllRestaurantsWithDishes
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiDescription Retrieves all restaurants including their dishes  and the chef's title.
 *
 * @apiSuccess {Object[]} restaurants Array of restaurant objects including dishes objects.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/with-dishes", restaurantController.getAllRestaurantsWithDishes);

/**
 * @api {get} /api/restaurants/popular Request All Popular Restaurants
 * @apiName GetAllPopularRestaurants
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiDescription Retrieves all restaurants marked as popular.
 *
 * @apiSuccess {Object[]} restaurants Array of popular restaurant objects.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/popular", restaurantController.getAllPopularRestaurants);

/**
 * @api {get} /api/restaurants/:id Request Restaurant by ID
 * @apiName GetRestaurantById
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a single restaurant by its ID.
 *
 * @apiParam {String} id Restaurant's unique ID.
 *
 * @apiSuccess {Object} restaurant Restaurant object with the specified ID.
 *
 * @apiError (404 Not Found) NotFound Restaurant with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/:id", restaurantController.getRestaurantById);

/**
 * @api {get} /api/restaurants/:id/with-dishes Request Restaurant by ID with Dishes
 * @apiName GetRestaurantWithDishes
 * @apiGroup Restaurant
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a single restaurant by its ID, including its dishes.
 *
 * @apiParam {String} id Restaurant's unique ID.
 *
 * @apiSuccess {Object} restaurant Restaurant object including dishes.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {...}
 *
 * @apiError (404 Not Found) NotFound Restaurant with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/:id/with-dishes", restaurantController.getRestaurantWithDishes);

export default router;
