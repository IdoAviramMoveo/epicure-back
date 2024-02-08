import { Request, Response } from "express";

import Dish from "../models/dish";
import Restaurant from "../models/restaurant";

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await Dish.find();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getAllSignatureDishes = async (req: Request, res: Response) => {
  try {
    const signatureDishes = await Dish.find({ isSignature: true });
    res.json(signatureDishes);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getDishById = async (req: Request, res: Response) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const createDish = async (req: Request, res: Response) => {
  try {
    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();
    await Restaurant.findByIdAndUpdate(
      savedDish.restaurant,
      { $push: { dishes: savedDish._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(savedDish);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(updatedDish);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    const deletedDish = await Dish.findByIdAndDelete(req.params.id);
    if (deletedDish) {
      await Restaurant.findByIdAndUpdate(
        deletedDish.restaurant,
        { $pull: { dishes: deletedDish._id } },
        { useFindAndModify: false }
      );
    }
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
