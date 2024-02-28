import { Router } from "express";
import * as searchController from "../../../controllers/searchController";

const router = Router();

/**
 * @api {get} /api/search Search Chefs, Dishes, and Restaurants
 * @apiName SearchAll
 * @apiGroup Search
 * @apiVersion  1.0.0
 * @apiDescription Performs a search across chefs, dishes, and restaurants based on a given search term.
 *
 * @apiParam (Query Parameter) {String} term The search term used for the autocomplete search.
 *
 * @apiSuccess {Object[]} chefs Array of chef objects that match the search term.
 * @apiSuccess {Object[]} dishes Array of dish objects that match the search term.
 * @apiSuccess {Object[]} restaurants Array of restaurant objects that match the search term.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "chefs": [],
 *         "dishes": [
 *             {
 *                 "_id": "65c0eda88d7ed3882311713f",
 *                 "title": "Pad Ki Mao",
 *                 "image": "https://epicure-images.s3.eu-north-1.amazonaws.com/Dishes/padKiMao.png",
 *                 "ingredients": [
 *                     "Shrimps",
 *                     "Glass Noodles",
 *                 ],
 *                 "tags": ["Spicy"],
 *                 "price": 90,
 *                 "restaurant": "65c1eae28d7ed388233c194b",
 *                 "isSignature": true
 *             },
 *             {
 *                 "_id": "65d1d0d54acb20d96c15bdc4",
 *                 "title": "Pad See Ew",
 *                 "image": "https://res.cloudinary.com/hotcooking/image/upload/f_auto,q_70,w_700/pad_see_ew.jpg",
 *                 "ingredients": [
 *                     "Wide Rice Noodles",
 *                     "Fish Sauce",
 *                 ],
 *                 "tags": ["Spicy"],
 *                 "price": 81,
 *                 "restaurant": "65c1eb048d7ed388233c1f73",
 *                 "isSignature": false
 *             }
 *         ],
 *         "restaurants": []
 *     }
 *
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "An unexpected error occurred"
 *     }
 */
router.get("/", searchController.searchAll);

export default router;
