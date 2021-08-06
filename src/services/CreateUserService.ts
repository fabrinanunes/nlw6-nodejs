import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import { hash } from "bcryptjs" 

interface IUserRequest{
   name: string
   email: string
   admin?: boolean
   password: string
}

class CreateUserService{
   async execute({ name, email, admin = false, password }: IUserRequest){

      //verifica se o e-mail foi incluido
      const usersRepository = getCustomRepository(UsersRepositories)
      if(!email){
         throw new Error("E-mail incorrect");
      }

      //verifica se o usuário já existe
      const userAlreadyExists = await usersRepository.findOne({email})
      if(userAlreadyExists){
         throw new Error("User already exists")
      }

      //criptografa para a senha
      const passwordHash = await hash(password, 8)

      //cria a instância e salva o objeto no banco de dados
      const user = usersRepository.create({name, email, admin, password: passwordHash})
      await usersRepository.save(user)
      return user
   }
}

export { CreateUserService }