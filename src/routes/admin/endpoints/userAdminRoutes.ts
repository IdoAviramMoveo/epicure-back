import { Router } from "express";
import * as userController from "../../../controllers/userController";
import { authenticateToken } from "../../../middleware/authenticateToken";

const router = Router();

/**
 * @api {get} /admin/users Get All Users
 * @apiName GetAllUsers
 * @apiGroup UserAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Retrieves all users from the database. Requires admin privileges.
 *
 * @apiHeader {String} Authorization Admin's access token.
 *
 * @apiSuccess {Object[]} users List of user objects.
 * @apiSuccess {String} users._id User ID.
 * @apiSuccess {String} users.name User's first name.
 * @apiSuccess {String} users.surname User's last name.
 * @apiSuccess {String} users.email User's email.
 * @apiSuccess {String} users.role User's role.
 *
 * @apiError (401 Unauthorized) Unauthorized Only admins can access this resource.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/", authenticateToken, userController.getAllUsers);

/**
 * @api {post} /admin/users/create-admin Create Admin
 * @apiName createAdmin
 * @apiGroup UserAdmin
 * @apiVersion 1.0.0
 * @apiDescription Creates a new admin in the system.
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
router.post("/create-admin", userController.createAdmin);

/**
 * @api {get} /admin/verify-token Verify Admin Token
 * @apiName VerifyToken
 * @apiGroup UserAdmin
 * @apiVersion 1.0.0
 * @apiDescription Verifies if the provided token is valid and not expired.
 *
 * @apiHeader {String} Authorization Admin's bearer token.
 *
 * @apiSuccess {Boolean} valid True if the token is valid.
 *
 * @apiError (401 Unauthorized) Unauthorized Token is invalid or expired.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.get("/verify-token", userController.verifyToken);

/**
 * @api {post} /admin/login Admin Login
 * @apiName AdminLogin
 * @apiGroup UserAdmin
 * @apiVersion 1.0.0
 * @apiPermission Admin
 * @apiDescription Authenticates an admin user and returns a token.
 *
 * @apiBody {String} email Admin's email.
 * @apiBody {String} password Admin's password.
 *
 * @apiSuccess {String} message Login successful message.
 * @apiSuccess {String} token Admin's authentication token.
 *
 * @apiError (401 Unauthorized) Unauthorized Invalid credentials or not an admin.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.post("/login", userController.adminLogin);

/**
 * @api {delete} /admin/users/:id Delete User
 * @apiName DeleteUser
 * @apiGroup UserAdmin
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiDescription Deletes a user from the database. Requires admin privileges.
 *
 * @apiParam {String} id ID of the user to delete.
 *
 * @apiHeader {String} Authorization Admin's access token.
 *
 * @apiSuccess {String} message Success message confirming the user has been deleted.
 *
 * @apiError (404 Not Found) NotFound User with the specified ID does not exist.
 * @apiError (401 Unauthorized) Unauthorized Only admins can access this resource.
 * @apiError (500 Internal Server Error) ServerError The server encountered an unexpected condition.
 */
router.delete("/:id", authenticateToken, userController.deleteUser);

export default router;
