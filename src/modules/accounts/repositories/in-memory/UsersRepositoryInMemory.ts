import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";



class UsersRepositoryInMemory implements IUsersRepository{
    users: User[] = [];

    async create({ name,  passworld, email, driver_license} : ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            passworld,
            email,
            driver_license
        });

        this.users.push(user);
    };

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }
    
    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

};


export { UsersRepositoryInMemory };