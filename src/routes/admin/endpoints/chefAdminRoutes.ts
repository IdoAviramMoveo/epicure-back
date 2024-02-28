import { Router } from "express";
import * as chefController from "../../../controllers/chefController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);

/**
 * @api {post} /admin/chefs Create a New Chef
 * @apiName CreateChef
 * @apiGroup ChefAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Creates a new chef.
 *
 * @apiBody {String} title Name of the chef.
 * @apiBody {String} image URL to the image of the chef.
 * @apiBody {String} description Description of the chef.
 * @apiBody {Array} [restaurants] List of restaurant IDs associated with the chef.
 * @apiBody {Boolean} [isChefOfTheWeek] Indicates if the chef is Chef of the Week
 *
 * @apiSuccess {Object} chef Newly created chef object.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.post("/", chefController.createChef);

/**
 * @api {put} /admin/chefs/:id Set Chef Of The Week
 * @apiName SetChefOfTheWeek
 * @apiGroup ChefAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Sets a chef as the Chef of the Week.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (404 Not Found) NotFound Chef with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/set-chef-of-the-week/:id", chefController.setChefOfTheWeek);

/**
 * @api {put} /admin/chefs/:id Update a Chef
 * @apiName UpdateChef
 * @apiGroup ChefAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Updates a chef's details.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiBody {String} [title] Title of the chef.
 * @apiBody {String} [image] URL to the image of the chef.
 * @apiBody {String} [description] Description of the chef.
 * @apiBody {Array} [newRestaurants] List of new restaurant IDs to add to the chef.
 * @apiBody {Boolean} [isChefOfTheWeek] Indicates if the chef is Chef of the Week
 *
 * @apiSuccess {Object} chef Updated chef object.
 *
 * @apiError (404 Not Found) NotFound Chef with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/:id", chefController.updateChef);

/**
 * @api {delete} /admin/chefs/:id Delete a Chef
 * @apiName DeleteChef
 * @apiGroup ChefAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Deletes a chef from the database.
 *
 * @apiParam {String} id Chef's unique ID.
 *
 * @apiSuccess {String} message Success message confirming the chef has been deleted.
 *
 * @apiError (404 Not Found) NotFound Chef with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.delete("/:id", chefController.deleteChef);

export default router;
