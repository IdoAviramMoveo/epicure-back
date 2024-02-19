import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectToDB } from "./db";
import apiRouter from "./routes/api/index";
import adminRouter from "./routes/admin/index";

dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Epicure API is running");
});

app.use("/api", apiRouter);
app.use("/admin", adminRouter);

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
