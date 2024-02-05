import { Router } from "express";
import * as chefController from "../controllers/chefController";

const router = Router();

router.get("/", chefController.getAllChefs);

export default router;
