import { ISpecificationRespository } from "../repositories/ISpecificatiosRepository";

interface IRequest{
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor( private specificationRepository: ISpecificationRespository){ }

    execute({name, description}: IRequest): void{
        const specificationAlredyExists = this.specificationRepository.findByName(name);
        
        if(specificationAlredyExists){
            throw new Error("Specification Alredy Exists");
        }
        
        this.specificationRepository.create({
            name,
            description
        });
    }

};


export { CreateSpecificationService }