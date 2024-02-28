import { Router } from "express";
import * as chefController from "../../../controllers/chefController";

const router = Router();

/**
 * @api {get} /api/chefs Request All Chefs information
 * @apiName GetAllChefs
 * @apiGroup Chef
 * @apiVersion  1.0.0
 * @apiDescription Retrieves all chefs including the array of restaurants for each chef and their details.
 *
 * @apiSuccess {Object[]} chefs Array of chef objects.
 * @apiSuccess {String} chefs._id Chef unique ID.
 * @apiSuccess {String} chefs.title Name of the chef.
 * @apiSuccess {String} chefs.image URL to the image of the chef.
 * @apiSuccess {String} chefs.description Short description of the chef.
 * @apiSuccess {Object[]} chefs.restaurants An array with all the details of all the chef's restaurants.
 * @apiSuccess {Boolean} chefs.isChefOfTheWeek Whether the chef is chef of the week - there is only one in the collection.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "_id": "65c0edfb8d7ed388231181f6",
 *             "title": "Yariv Malili",
 *             "image": "url_to_image_of_yariv_malili.png",
 *             "description": "Chef Yariv Malili has been living and breathing his culinary dreams for more than two decades..."
 *             "restaurants": [],
 *             "isChefOfTheWeek": false,
 *         }
 *     ]
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "An unexpected error occurred"
 *     }
 */
router.get("/", chefController.getAllChefs);

/**
 * @api {get} /api/chefs/chef-of-the-week Request Chef of the Week
 * @apiName GetChefOfTheWeek
 * @apiGroup Chef
 * @apiVersion  1.0.0
 * @apiDescription Retrieves the chef who is currently set as Chef of the Week.
 *
 * @apiSuccess {Object} chef Chef object marked as Chef of the Week.
 * @apiError (404 Not Found) NotFound Chef of the Week is not set.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/chef-of-the-week", chefController.getChefOfTheWeek);

/**
 * @api {get} /api/chefs/:id Request Chef by ID
 * @apiName GetChefById
 * @apiGroup Chef
 * @apiVersion  1.0.0
 * @apiDescription Retrieves a single chef by his unique ID along with associated restaurants.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiSuccess {Object} chef Chef object with the specified ID.
 *
 * @apiError (404 Not Found) NotFound Chef with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/:id", chefController.getChefById);

/**
 * @api {get} /api/chefs/:id/with-restaurants Request Chef and their Restaurants
 * @apiName GetChefWithRestaurants
 * @apiGroup Chef
 * @apiVersion  1.0.0
 * @apiDescription Retrieves a single chef by his ID along with detailed information of his associated restaurants.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiSuccess {Object} chef Chef object including restaurant details.
 * @apiError (404 Not Found) NotFound Chef with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/:id/with-restaurants", chefController.getChefWithRestaurants);

export default router;
