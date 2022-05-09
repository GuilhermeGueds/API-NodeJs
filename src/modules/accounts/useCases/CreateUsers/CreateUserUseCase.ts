import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcryptjs";


@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ){}

    async execute({name, passworld, email, driver_license }: ICreateUserDTO): Promise<void>{

        const userAlredyExists = await this.userRepository.findByEmail(email);

        if (userAlredyExists){
            throw new Error("User already exists !")
        }
        
        const passworldHash = await hash(passworld, 8 );

        await this.userRepository.create({
            name,
            passworld: passworldHash,
            email,
            driver_license })
    }
}

export{ CreateUserUseCase}