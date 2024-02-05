import mongoose, { Connection } from "mongoose";

const uri: string = "mongodb+srv://idoa:9XYqbPhV1MomxuaA@moveo.lpb0qiu.mongodb.net/?retryWrites=true&w=majority";

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
