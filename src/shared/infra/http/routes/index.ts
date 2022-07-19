import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes"
import { authenticateRoutes } from "./authenticate.routes";
import { usersRoutes } from "./users.routes";


const router = Router();


router.use("/categories/", categoriesRoutes);

router.use("/specification/", specificationsRoutes);

router.use("/users", usersRoutes);

router.use(authenticateRoutes);


export { router };