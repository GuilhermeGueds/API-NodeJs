import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file"

interface IRequast{
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({user_id, avatarFile}: IRequast): Promise<void> {
        const user = await this. usersRepository.findById(user_id);

        if(user.avatar){
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatarFile;

        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };