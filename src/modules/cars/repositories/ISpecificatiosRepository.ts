import { Specification } from "../model/Specification";

interface ICreateSpecificationDTO{
    name: string;
    description: string;
}

interface ISpecificationRespository {

    create({name, description}: ICreateSpecificationDTO): void
    findByName(name: string): Specification
}


export { ISpecificationRespository, ICreateSpecificationDTO }