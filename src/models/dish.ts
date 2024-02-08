import mongoose, { Schema, Document } from "mongoose";

import { IRestaurant } from "./restaurant";

export interface IDish extends Document {
  title: string;
  image: string;
  ingredients: string[];
  tags: string[];
  price: number;
  restaurant: IRestaurant;
  isSignature: boolean;
}

const DishSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  price: { type: Number, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  isSignature: { type: Boolean, required: true, default: false },
});

const Dish = mongoose.model<IDish>("Dish", DishSchema);

export default Dish;
