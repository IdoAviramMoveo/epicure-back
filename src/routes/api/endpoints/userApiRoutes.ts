import { Router } from "express";
import * as userController from "../../../controllers/userController";

const router = Router();

/**
 * @api {post} /api/users/create-user Create User
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Creates a new user in the system.
 *
 * @apiBody {String} name User's first name.
 * @apiBody {String} surname User's last name.
 * @apiBody {String} email User's email address.
 * @apiBody {String} password User's password.
 *
 * @apiSuccess {String} message Confirmation message.
 * @apiSuccess {Object} user User object (without password).
 *
 * @apiError (400 Bad Request) BadRequest Invalid or missing fields.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.post("/create-user", userController.createUser);

/**
 * @api {post} /api/users/login User Login
 * @apiName UserLogin
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Authenticates a user and returns a token.
 *
 * @apiBody {String} email User's email address.
 * @apiBody {String} password User's password.
 *
 * @apiSuccess {String} message Login successful message.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiError (401 Unauthorized) Unauthorized Invalid credentials.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.post("/login", userController.userLogin);

/**
 * @api {get} /api/users/verify-token Verify Token
 * @apiName VerifyToken
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Verifies if the provided token is valid and not expired.
 *
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Boolean} valid True if the token is valid.
 *
 * @apiError (401 Unauthorized) Unauthorized Token is invalid or expired.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/verify-token", userController.verifyToken);

export default router;
