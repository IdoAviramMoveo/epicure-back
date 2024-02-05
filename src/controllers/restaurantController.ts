import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
