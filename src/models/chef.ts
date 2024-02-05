import mongoose, { Schema, Document } from "mongoose";

import { IRestaurant } from "./restaurant";

export interface IChef extends Document {
  title: string;
  image: string;
  description: string;
  restaurants: IRestaurant[];
}

const ChefSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  restaurants: [{ type: Schema.Types.ObjectId, ref: "Restaurant", required: true }],
});

const Chef = mongoose.model<IChef>("Chef", ChefSchema);

export default Chef;
