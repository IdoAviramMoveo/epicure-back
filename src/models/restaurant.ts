import mongoose, { Schema, Document } from "mongoose";

import { IDish } from "./dish";
import { IChef } from "./chef";

export interface IRestaurant extends Document {
  title: string;
  image: string;
  chef: IChef;
  rating: number;
  dishes: IDish[];
}

const RestaurantSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  chef: { type: Schema.Types.ObjectId, ref: "Chef", required: true },
  rating: { type: Number, required: true },
  dishes: [{ type: Schema.Types.ObjectId, ref: "Dish", required: true }],
});

const Restaurant = mongoose.model<IRestaurant>("Restaurant", RestaurantSchema);

export default Restaurant;
