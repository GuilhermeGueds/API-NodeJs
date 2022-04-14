import { ImportCategoryController } from "./ImportCategoryController"
import { ImportCategorieUseCase } from "./ImportCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

const categoriesRepository =  CategoriesRepository.getInstance();
const importCategoryUsecase = new ImportCategorieUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(importCategoryUsecase);


export { importCategoryController };