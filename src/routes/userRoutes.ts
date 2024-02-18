import { Router } from "express";

import * as userController from "../controllers/userController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/create", userController.createUser);
router.post("/login", userController.userLogin);
router.post("/admin/login", userController.adminLogin);
router.get("/verify-token", userController.verifyToken);
router.delete("/:id", authenticateToken, userController.deleteUser);

export default router;
