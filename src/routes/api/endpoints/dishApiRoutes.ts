import { Router } from "express";
import * as dishController from "../../../controllers/dishController";

const router = Router();

/**
 * @api {get} /api/dishes Request All Dishes information
 * @apiName GetAllDishes
 * @apiGroup Dish
 * @apiVersion  1.0.0
 * @apiDescription Retrieves all dishes including their ingredients, tags, and associated restaurant.
 *
 * @apiSuccess {Object[]} dishes Array of dish objects.
 * @apiSuccess {String} dishes._id Dish unique ID.
 * @apiSuccess {String} dishes.title Title of the dish.
 * @apiSuccess {String} dishes.image URL to the image of the dish.
 * @apiSuccess {String[]} dishes.ingredients List of ingredients in the dish.
 * @apiSuccess {String[]} dishes.tags List of tags associated with the dish.
 * @apiSuccess {Number} dishes.price Price of the dish.
 * @apiSuccess {Object} dishes.restaurant Restaurant ID and title related to the dish.
 * @apiSuccess {Boolean} dishes.isSignature Whether the dish is a signature dish.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "_id": "65c0eda88d7ed3882311713f",
 *             "title": "Pad Ki Mao",
 *             "image": "url_to_image_of_pad_ki_mao.png",
 *             "ingredients": ["Shrimps", "Noodles", "Shalltos"],
 *             "tags": ["Spicy"],
 *             "price": 90,
 *             "restaurant": {
 *                  "_id": "65c1eae28d7ed388233c194b",
 *                  "title": "Claro"
 *             },
 *             "isSignature": true,
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
router.get("/", dishController.getAllDishes);

/**
 * @api {get} /api/dishes/signature Request All Signature Dishes
 * @apiName GetAllSignatureDishes
 * @apiGroup Dish
 * @apiVersion  1.0.0
 * @apiDescription Retrieves all signature dishes from the database.
 *
 * @apiSuccess {Object[]} dishes Array of dish objects that are marked as signature dishes.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/signature", dishController.getAllSignatureDishes);

/**
 * @api {get} /api/dishes/ingredient/:ingredient Request Dishes by Ingredient
 * @apiName GetDishesByIngredient
 * @apiGroup Dish
 * @apiVersion  1.0.0
 * @apiDescription Retrieves dishes that contain a specific ingredient.
 *
 * @apiParam {String} ingredient Name of the ingredient to filter dishes by.
 *
 * @apiSuccess {Object[]} dishes Array of dish objects that contain the specified ingredient.
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/ingredient/:ingredient", dishController.getDishesByIngredient);

/**
 * @api {get} /api/dishes/:id Request Dish by ID
 * @apiName GetDishById
 * @apiGroup Dish
 * @apiVersion  1.0.0
 * @apiDescription Retrieves a single dish by its ID.
 *
 * @apiParam {String} id Dish's unique ID.
 *
 * @apiSuccess {Object} dish Dish object with the specified ID.
 *
 * @apiError (404 Not Found) NotFound Dish with the given ID was not found.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/:id", dishController.getDishById);

export default router;
