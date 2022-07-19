import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICarsRepository } from "../ICarsRepository";



class CarsRepodsitoryInMemory implements ICarsRepository{
    cars: Car[] = [];

    async create({name, brand, category_id, daily_rate, description, fine_amount, license_plate}: ICreateCarDTO): Promise<void> {
        const car = new Car();

        Object.assign(car,{
            name,
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate
        })
        this.cars.push(car);
    }
    async findByLicensePlate(license_plate:string): Promise<Car> {
        
    }
};

export {CarsRepodsitoryInMemory};