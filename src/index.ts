import express from "express";
import { connectToDB } from "./db";

const app: express.Application = express();
const port: number = 3000;

connectToDB();
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
