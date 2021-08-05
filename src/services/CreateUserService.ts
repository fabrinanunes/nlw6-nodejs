import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest{
   name: string
   email: string
   admin?: boolean
}

class CreateUserService{
   async execute({ name, email, admin }: IUserRequest){

      //verifica se o e-mail já foi utlizado
      const usersRepository = getCustomRepository(UsersRepositories)
      if(!email){
         throw new Error("E-mail already registered");
      }

      //verifica se o usuário já existe
      const userAlreadyExists = await usersRepository.findOne({email})
      if(userAlreadyExists){
         throw new Error("User already exists")
      }

      //cria a instância e salva o objeto no banco de dados
      const user = usersRepository.create({name, email, admin})
      await usersRepository.save(user)
      return user
   }
}

export { CreateUserService }