import express from "express";
import dotenv from "dotenv";

import { connectToDB } from "./db";
import restaurantRoutes from "./routes/restaurantRoutes";
import chefRoutes from "./routes/chefRoutes";
import dishRoutes from "./routes/dishRoutes";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/restaurants", restaurantRoutes);
app.use("/dishes", dishRoutes);
app.use("/chefs", chefRoutes);

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

export default app;
