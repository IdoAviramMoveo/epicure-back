import { Request, Response } from "express";
import Chef from "../models/chef";

export const getAllChefs = async (req: Request, res: Response) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
