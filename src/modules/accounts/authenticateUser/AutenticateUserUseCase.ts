import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { sign } from "jsonwebtoken";

interface IRequest {
    email: string;
    passworld: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({email, passworld}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user){
            throw new Error("Email or passworld incorrect !");
        }

        const passworldMath = await compare(passworld, user.passworld);

        if (!passworldMath){
            throw new Error("Email or passworld incorrect !");
        }

        const token = sign({}, "c8d9b07a8cfef99bdab6c49a02dfb69b", {
           subject: user.id,
           expiresIn: "1d" 
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        };
        return tokenReturn;
    }
}


export { AuthenticateUserUseCase };