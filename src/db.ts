import mongoose, { Connection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGODB_URI || "";

let dbConnection: Connection;

export const connectToDB = async () => {
  try {
    await mongoose.connect(uri, {});
    mongoose.set("strictPopulate", false);
    dbConnection = mongoose.connection;
    console.log("Connected to the database");
  } catch (err) {
    console.error(err, "Error connecting to the database");
  }
};
