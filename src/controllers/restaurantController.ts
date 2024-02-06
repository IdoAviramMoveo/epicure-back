import { Request, Response } from "express";

import Restaurant from "../models/restaurant";
import Chef from "../models/chef";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getRestaurantWithDishes = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurantWithDishes = await Restaurant.findById(restaurantId).populate("dishes");
    if (!restaurantWithDishes) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurantWithDishes);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = new Restaurant(req.body);
    const savedRestaurant = await newRestaurant.save();
    await Chef.findByIdAndUpdate(
      savedRestaurant.chef,
      { $push: { restaurants: savedRestaurant._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(savedRestaurant);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (deletedRestaurant) {
      await Chef.findByIdAndUpdate(
        deletedRestaurant.chef,
        { $pull: { restaurants: deletedRestaurant._id } },
        { new: true, useFindAndModify: false }
      );
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred", error: err });
  }
};
