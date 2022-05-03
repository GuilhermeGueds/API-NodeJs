import {inject, injectable} from "tsyringe"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


interface Irequest{
    name: string;
    description: string;
} 

@injectable()
class CreateCategoryUseCase {
    
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ){};

    async execute({name, description}: Irequest): Promise<void>{
        

        const categoryAlredyExists = await this.categoriesRepository.findByName(name);
        
        if(categoryAlredyExists){
            throw new Error(" Category Alredy Exists !");
    }
        this.categoriesRepository.create( { name, description } );
        
    }
}



export { CreateCategoryUseCase };