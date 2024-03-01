import { Request, Response } from "express";

import Restaurant from "../models/restaurant";
import Chef from "../models/chef";
import Dish from "../models/dish";

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find().populate("chef", "title");
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getAllRestaurantsWithDishes = async (req: Request, res: Response) => {
  try {
    const restaurantsWithDishesAndChef = await Restaurant.find().populate("dishes").populate({
      path: "chef",
      select: "title",
    });
    res.json(restaurantsWithDishesAndChef);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred", error: err });
  }
};

export const getAllPopularRestaurants = async (req: Request, res: Response) => {
  try {
    const popularRestaurants = await Restaurant.find({ isPopular: true }).populate("chef", "title");
    res.json(popularRestaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const setRestaurantAsPopular = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, { $set: { isPopular: true } }, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const unsetRestaurantAsPopular = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, { $set: { isPopular: false } }, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
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
    const currentRestaurant = await Restaurant.findById(req.params.id);
    if (!currentRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const currentChefId = currentRestaurant.chef;
    const newChefId = req.body.chef;
    if (!currentChefId.equals(newChefId)) {
      await Chef.findByIdAndUpdate(currentChefId, { $pull: { restaurants: currentRestaurant._id } });
      await Chef.findByIdAndUpdate(newChefId, { $addToSet: { restaurants: currentRestaurant._id } });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("chef", "title");
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Unable to update restaurant" });
    }
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    await Dish.deleteMany({ restaurant: restaurantId });

    await Chef.findByIdAndUpdate(restaurant.chef, { $pull: { restaurants: restaurantId } }, { new: true, useFindAndModify: false });

    await Restaurant.findByIdAndDelete(restaurantId);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred", error: err });
  }
};
