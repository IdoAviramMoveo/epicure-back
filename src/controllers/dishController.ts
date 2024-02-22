import { Request, Response } from "express";

import Dish from "../models/dish";
import Restaurant from "../models/restaurant";

export const getAllDishes = async (req: Request, res: Response) => {
  try {
    const dishes = await Dish.find().populate({
      path: "restaurant",
      select: "title",
    });
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

export const setDishAsSignature = async (req: Request, res: Response) => {
  const dishId = req.params.id;
  try {
    const updatedDish = await Dish.findByIdAndUpdate(dishId, { $set: { isSignature: true } }, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const unsetDishAsSignature = async (req: Request, res: Response) => {
  const dishId = req.params.id;
  try {
    const updatedDish = await Dish.findByIdAndUpdate(dishId, { $set: { isSignature: false } }, { new: true });
    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.status(200).json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getDishesByIngredient = async (req: Request, res: Response) => {
  try {
    const { ingredient } = req.params;
    const regex = new RegExp(ingredient, "i");
    const dishesWithIngredient = await Dish.find({ ingredients: { $regex: regex } });
    res.json(dishesWithIngredient);
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
    await Restaurant.findByIdAndUpdate(savedDish.restaurant, { $push: { dishes: savedDish._id } }, { new: true, useFindAndModify: false });
    res.status(201).json(savedDish);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  try {
    const currentDish = await Dish.findById(req.params.id);
    if (!currentDish) {
      return res.status(404).json({ message: "Dish not found" });
    }

    const currentRestaurantId = currentDish.restaurant;
    const newRestaurantId = req.body.restaurant;

    if (!currentRestaurantId.equals(newRestaurantId)) {
      await Restaurant.findByIdAndUpdate(currentRestaurantId, { $pull: { dishes: currentDish._id } });
      await Restaurant.findByIdAndUpdate(newRestaurantId, { $addToSet: { dishes: currentDish._id } });
    }

    const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("restaurant");
    if (!updatedDish) {
      return res.status(404).json({ message: "Unable to update dish" });
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
      await Restaurant.findByIdAndUpdate(deletedDish.restaurant, { $pull: { dishes: deletedDish._id } }, { useFindAndModify: false });
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
