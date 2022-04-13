import { Request, Response } from "express";
import { ListCategoriesUsecase } from "./ListCategoriesUseCase";

 

class ListCategoriesController{
    constructor(private listCategoriesUseCase: ListCategoriesUsecase) {}

    handle(request: Request, response: Response): Response{
        const all =  this.listCategoriesUseCase.execute();
        
        return response.json(all);
    }
}

export { ListCategoriesController };