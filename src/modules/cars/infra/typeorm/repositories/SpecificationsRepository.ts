
import { getRepository, Repository } from "typeorm";
import { ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository";
import { ISpecificationRepository } from "../../../repositories/ISpecificatiosRepository";
import { Specification } from "../entities/Specification";




class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification);
     }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
       const specification = this.repository.create({
           name,
           description
       });
       await this.repository.save(specification);
    }

    async findByName( name: string ): Promise<Specification> {
        const specification = await this.repository.findOne({name});
        return specification;
    }
    
};


export { SpecificationRepository };