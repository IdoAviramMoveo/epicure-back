import { Router } from "express";
import * as dishController from "../controllers/dishController";

const router = Router();

router.get("/", dishController.getAllDishes);

export default router;
