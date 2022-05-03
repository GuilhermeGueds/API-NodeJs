import { Request, Response } from "express";
import { ImportCategorieUseCase } from "./ImportCategoryUseCase";
import {container} from "tsyringe"


 class ImportCategoryController {
    
    async handle(request: Request, response: Response):Promise<Response>{
        const {file} = request;

        const importCategoryusecase = container.resolve(ImportCategorieUseCase)

       await importCategoryusecase.execute(file);
        
        return response.send();
    }
}



export { ImportCategoryController };