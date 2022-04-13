import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUsecase } from "./ListCategoriesUseCase";



const categoriesRepository = new CategoriesRepository();
const listCategoriesUsecase = new ListCategoriesUsecase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUsecase);

export { listCategoriesController };