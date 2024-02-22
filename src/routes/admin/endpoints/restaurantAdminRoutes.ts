import { Router } from "express";
import * as restaurantController from "../../../controllers/restaurantController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);

/**
 * @api {post} /admin/restaurants Create a New Restaurant
 * @apiName CreateRestaurant
 * @apiGroup RestaurantAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Creates a new restaurant and adds it to the database.
 *
 * @apiBody {String} title Title of the restaurant.
 * @apiBody {String} image URL to the image of the restaurant.
 * @apiBody {String} chef Chef's ID who is associated with the restaurant.
 * @apiBody {Number} rating Rating of the restaurant.
 * @apiBody {Array} [dishes] List of dishes IDs associated with the restaurant.
 * @apiBody {Boolean} [isPopular=false] Whether the restaurant is marked as popular.
 *
 * @apiSuccess {Object} restaurant Newly created restaurant object.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.post("/", restaurantController.createRestaurant);

/**
 * @api {put} /admin/restaurants/:id Update a Restaurant
 * @apiName UpdateRestaurant
 * @apiGroup RestaurantAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Updates an existing restaurant in the database.
 *
 * @apiParam {String} id Restaurant's unique ID.
 *
 * @apiBody {String} [title] Title of the restaurant.
 * @apiBody {String} [image] URL to the image of the restaurant.
 * @apiBody {String} [chef] Chef's ID who is associated with the restaurant.
 * @apiBody {Number} [rating] Rating of the restaurant.
 * @apiBody {Array} [newDishes] List of dishes IDs associated with the restaurant.
 * @apiBody {Boolean} [isPopular] Whether the restaurant is marked as popular.
 *
 * @apiSuccess {Object} restaurant Updated restaurant object.
 *
 * @apiError (404 Not Found) NotFound Restaurant with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/:id", restaurantController.updateRestaurant);

/**
 * @api {delete} /admin/restaurants/:id Delete a Restaurant
 * @apiName DeleteRestaurant
 * @apiGroup RestaurantAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Deletes a restaurant from the database.
 *
 * @apiParam {String} id Restaurant's unique ID.
 *
 * @apiSuccess {String} message Success message confirming the restaurant has been deleted.
 *
 * @apiError (404 Not Found) NotFound Restaurant with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.delete("/:id", restaurantController.deleteRestaurant);

/**
 * @api {put} /admin/restaurants/set-popular/:id Set Restaurant as Popular
 * @apiName SetRestaurantAsPopular
 * @apiGroup RestaurantAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Marks a restaurant as popular.
 *
 * @apiParam {String} id Restaurant's unique ID.
 *
 * @apiSuccess {Object} restaurant Updated restaurant object marked as popular.
 *
 * @apiError (404 Not Found) NotFound Restaurant with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/set-popular/:id", restaurantController.setRestaurantAsPopular);

/**
 * @api {put} /admin/restaurants/unset-popular/:id Unset Restaurant as Popular
 * @apiName UnsetRestaurantAsPopular
 * @apiGroup RestaurantAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Removes the popular mark from a restaurant.
 *
 * @apiParam {String} id Restaurant's unique ID.
 *
 * @apiSuccess {Object} restaurant Updated restaurant object no longer marked as popular.
 *
 * @apiError (404 Not Found) NotFound Restaurant with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/unset-popular/:id", restaurantController.unsetRestaurantAsPopular);

export default router;
