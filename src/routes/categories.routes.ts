import { Router } from "express";
import multer from "multer";
import "reflect-metadata";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";



const upload = multer({
    dest: "./tmp"
});

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoriesController();


categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (listCategoryController.handle));


categoriesRoutes.post("/import", upload.single("file"),importCategoryController.handle);




export { categoriesRoutes };

