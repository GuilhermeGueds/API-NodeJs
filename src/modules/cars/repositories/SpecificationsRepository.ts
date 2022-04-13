import { Specification } from "../model/Specification";
import { ISpecificationRespository, ICreateSpecificationDTO } from "./ISpecificatiosRepository";



class SpecificationRespository implements ISpecificationRespository {
    private specifications = [];

    constructor() {
        this.specifications = [];
    }
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });
        this.specifications.push(specification);
    }

    findByName( name: string ): Specification {
        const specification = this.specifications.find(specification => specification.name === name);
       
        return specification;
    }
    
};


export { SpecificationRespository };