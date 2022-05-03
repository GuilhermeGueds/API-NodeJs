

import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "../../repositories/ISpecificatiosRepository";

interface IRequest{
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationRepository")
        private specificationRepository: ISpecificationRepository
    ){ }

    async execute({name, description}: IRequest): Promise<void>{
        const specificationAlredyExists = await this.specificationRepository.findByName(name);
        
        if(specificationAlredyExists){
            throw new Error("Specification Alredy Exists");
        }
        
        await this.specificationRepository.create({
            name,
            description
        });
    }

};


export { CreateSpecificationUseCase }