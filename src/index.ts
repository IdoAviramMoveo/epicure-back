import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDB } from "./db";
import restaurantRoutes from "./routes/restaurantRoutes";
import chefRoutes from "./routes/chefRoutes";
import dishRoutes from "./routes/dishRoutes";
import searchRoutes from "./routes/searchRoutes";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Epicure API is running");
});

app.use("/restaurants", restaurantRoutes);
app.use("/dishes", dishRoutes);
app.use("/chefs", chefRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });

export default app;
