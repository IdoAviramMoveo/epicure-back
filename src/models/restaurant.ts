import mongoose, { Schema, Document } from "mongoose";

import { IDish } from "./dish";

export interface IRestaurant extends Document {
  title: string;
  image: string;
  description: string;
  rating: number;
  dishes: IDish[];
}

const RestaurantSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish", required: true }],
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
