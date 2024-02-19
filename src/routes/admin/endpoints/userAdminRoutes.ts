import { Router } from "express";
import * as userController from "../../../controllers/userController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

router.get("/", authenticateToken, userController.getAllUsers);
router.get("/verify-token", userController.verifyToken);
router.post("/login", userController.adminLogin);
router.delete("/:id", authenticateToken, userController.deleteUser);

export default router;
