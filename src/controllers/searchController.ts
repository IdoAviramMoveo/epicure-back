import { Request, Response } from "express";

import Restaurant from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";

export const searchAll = async (req: Request, res: Response) => {
  const searchTerm = typeof req.query.term === "string" ? req.query.term : "";

  try {
    const chefsPromise = Chef.aggregate([
      {
        $search: {
          index: "search-chefs",
          text: {
            query: searchTerm,
            path: "title",
          },
        },
      },
      { $project: { _id: 1, title: 1, image: 1, description: 1 } },
    ]);

    const dishesPromise = Dish.aggregate([
      {
        $search: {
          index: "search-dishes",
          text: {
            query: searchTerm,
            path: "title",
          },
        },
      },
    ]);

    const restaurantsPromise = Restaurant.aggregate([
      {
        $search: {
          index: "search-restaurants",
          text: {
            query: searchTerm,
            path: "title",
          },
        },
      },
    ]);

    const [chefs, dishes, restaurants] = await Promise.all([chefsPromise, dishesPromise, restaurantsPromise]);

    res.json({ chefs, dishes, restaurants });
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
