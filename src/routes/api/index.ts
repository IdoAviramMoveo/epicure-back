import { Router } from "express";
import chefApiRoutes from "./endpoints/chefApiRoutes";
import dishApiRoutes from "./endpoints/dishApiRoutes";
import restaurantApiRoutes from "./endpoints/restaurantApiRoutes";
import searchApiRoutes from "./endpoints/searchApiRoutes";
import userApiRoutes from "./endpoints/userApiRoutes";

const apiRouter = Router();

apiRouter.use("/chefs", chefApiRoutes);
apiRouter.use("/dishes", dishApiRoutes);
apiRouter.use("/restaurants", restaurantApiRoutes);
apiRouter.use("/search", searchApiRoutes);
apiRouter.use("/users", userApiRoutes);

export default apiRouter;
