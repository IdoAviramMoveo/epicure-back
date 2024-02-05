import { Request, Response } from "express";
import Dish from "../models/dish";

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
