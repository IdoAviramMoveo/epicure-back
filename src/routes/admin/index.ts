import { Router } from "express";
import chefAdminRoutes from "./endpoints/chefAdminRoutes";
import dishAdminRoutes from "./endpoints/dishAdminRoutes";
import restaurantAdminRoutes from "./endpoints/restaurantAdminRoutes";
import userAdminRoutes from "./endpoints/userAdminRoutes";

const adminRouter = Router();

adminRouter.use("/chefs", chefAdminRoutes);
adminRouter.use("/dishes", dishAdminRoutes);
adminRouter.use("/restaurants", restaurantAdminRoutes);
adminRouter.use("/users", userAdminRoutes);

export default adminRouter;
