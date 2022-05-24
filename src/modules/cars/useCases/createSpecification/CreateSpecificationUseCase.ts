

import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
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
            throw new AppError("Specification Alredy Exists");
        }
        
        await this.specificationRepository.create({
            name,
            description
        });
    }

};


export { CreateSpecificationUseCase }