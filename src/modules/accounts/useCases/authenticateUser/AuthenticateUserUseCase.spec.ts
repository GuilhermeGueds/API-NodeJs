
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUsers/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AutenticateUserUseCase";



let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });
    
    
    it("should be able to authenticate an user", async() => {
        const user: ICreateUserDTO = {
            name: "User test",
            email: "user@test.com",
            passworld: "1234",
            driver_license: "000123"
        };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
        email: user.email,
        passworld: user.passworld
    });

    expect(result).toHaveProperty("token");
    });

    it("shold not be able authenticacte an nonexistent user", () => {
        expect(async() => {
            await authenticateUserUseCase.execute({
                email:"false@email.com",
                passworld: "1234"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shold not be able to authenticate with incorrect passworld", () => {
        expect(async() => {
            const user: ICreateUserDTO = {
                name: "User test error",
                email: "user@test.com",
                passworld: "1234",
                driver_license: "9999"
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                passworld: "incorrect passworld"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});