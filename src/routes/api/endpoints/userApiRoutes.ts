import { Router } from "express";
import * as userController from "../../../controllers/userController";

const router = Router();

router.post("/create", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/verify-token", userController.verifyToken);

export default router;
