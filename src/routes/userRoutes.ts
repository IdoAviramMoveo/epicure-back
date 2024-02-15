import { Router } from "express";

import * as userController from "../controllers/userController";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.post("/login", userController.userLogin);
router.post("/admin/login", userController.adminLogin);
router.get("/verify-token", userController.verifyToken);

export default router;
