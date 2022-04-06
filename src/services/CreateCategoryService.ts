
import { CategoriesRepository } from "../repositories/CategoriesRepository";


interface Irequest{
    name: string;
    description: string;
} 


class CreateCategoryService {
    
    constructor(private categoriesRepository: CategoriesRepository){};

    execute({name, description}: Irequest): void{
        

        const categoryAlredyExists = this.categoriesRepository.findByName(name);
        
        if(categoryAlredyExists){
            throw new Error(" Category Alredy Exists !");
    }
        this.categoriesRepository.create( { name, description } );
        
    }
}



export { CreateCategoryService };