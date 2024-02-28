import { Router } from "express";
import * as dishController from "../../../controllers/dishController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.use(authenticateToken);

/**
 * @api {post} /admin/dishes Create a New Dish
 * @apiName CreateDish
 * @apiGroup DishAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Creates a new dish and adds it to the database.
 *
 * @apiBody {String} title Title of the dish.
 * @apiBody {String} image URL to the image of the dish.
 * @apiBody {String[]} ingredients List of ingredients in the dish.
 * @apiBody {String[]} [tags] List of tags associated with the dish.
 * @apiBody {Number} price Price of the dish.
 * @apiBody {String} restaurant Restaurant ID associated with the dish.
 * @apiBody {Boolean} [isSignature=false] Whether the dish is a signature dish or not.
 *
 * @apiSuccess {Object} dish Newly created dish object.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.post("/", dishController.createDish);

/**
 * @api {put} /admin/dishes/:id Update a Dish
 * @apiName UpdateDish
 * @apiGroup DishAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Updates an existing dish in the database.
 *
 * @apiParam {String} id Dish's unique ID.
 *
 * @apiBody {String} [title] Title of the dish.
 * @apiBody {String} [image] URL to the image of the dish.
 * @apiBody {String[]} [ingredients] List of ingredients in the dish.
 * @apiBody {String[]} [tags] List of tags associated with the dish.
 * @apiBody {Number} [price] Price of the dish.
 * @apiBody {String} [restaurant] Restaurant ID associated with the dish.
 * @apiBody {Boolean} [isSignature] Whether the dish is a signature dish or not.
 *
 * @apiSuccess {Object} dish Updated dish object.
 *
 * @apiError (404 Not Found) NotFound Dish with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/:id", dishController.updateDish);

/**
 * @api {delete} /admin/dishes/:id Delete a Dish
 * @apiName DeleteDish
 * @apiGroup DishAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Deletes a dish from the database.
 *
 * @apiParam {String} id Dish's unique ID.
 *
 * @apiSuccess {String} message Success message confirming the dish has been deleted.
 *
 * @apiError (404 Not Found) NotFound Dish with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.delete("/:id", dishController.deleteDish);

/**
 * @api {put} /admin/dishes/set-signature/:id Set Dish as Signature
 * @apiName SetDishAsSignature
 * @apiGroup DishAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Marks a dish as a signature dish.
 *
 * @apiParam {String} id Dish's unique ID.
 *
 * @apiSuccess {Object} dish Updated dish object marked as signature.
 *
 * @apiError (404 Not Found) NotFound Dish with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/set-signature/:id", dishController.setDishAsSignature);

/**
 * @api {put} /admin/dishes/unset-signature/:id Unset Dish as Signature
 * @apiName UnsetDishAsSignature
 * @apiGroup DishAdmin
 * @apiVersion  1.0.0
 * @apiPermission Admin
 * @apiDescription Removes the signature mark from a dish.
 *
 * @apiParam {String} id Dish's unique ID.
 *
 * @apiSuccess {Object} dish Updated dish object no longer marked as signature.
 *
 * @apiError (404 Not Found) NotFound Dish with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.put("/unset-signature/:id", dishController.unsetDishAsSignature);

export default router;
