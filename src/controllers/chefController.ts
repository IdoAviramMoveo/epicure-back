import { Request, Response } from "express";

import Chef from "../models/chef";

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await Chef.find().populate("restaurants");
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getChefById = async (req: Request, res: Response) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(chef);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    const chefOfTheWeek = await Chef.findOne({ isChefOfTheWeek: true }).populate("restaurants");
    if (!chefOfTheWeek) {
      return res.status(404).json({ message: "Chef of the week not found" });
    }
    res.json(chefOfTheWeek);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const setChefOfTheWeek = async (req: Request, res: Response) => {
  const chefId = req.params.id;
  try {
    await Chef.updateMany({}, { $set: { isChefOfTheWeek: false } });
    const updatedChef = await Chef.findByIdAndUpdate(chefId, { $set: { isChefOfTheWeek: true } }, { new: true });
    if (!updatedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.status(200).json(updatedChef);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getChefWithRestaurants = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const chefWithRestaurants = await Chef.findById(chefId).populate("restaurants");
    if (!chefWithRestaurants) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(chefWithRestaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const createChef = async (req: Request, res: Response) => {
  try {
    const newChef = new Chef(req.body);
    const savedChef = await newChef.save();
    res.status(201).json(savedChef);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const updateChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const { newRestaurants, ...updateData } = req.body;
    const update = {
      ...updateData,
      ...(newRestaurants ? { $push: { restaurants: { $each: newRestaurants } } } : {}),
    };
    const updatedChef = await Chef.findByIdAndUpdate(chefId, update, { new: true, useFindAndModify: false }).populate("restaurants");
    if (!updatedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(updatedChef);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteChef = async (req: Request, res: Response) => {
  try {
    const deletedChef = await Chef.findByIdAndDelete(req.params.id);
    if (!deletedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
