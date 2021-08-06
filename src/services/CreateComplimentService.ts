import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IComplimentRequest {
  tag_id: string
  user_sender: string
  user_receiver: string
  message: string
}

class CreateComplimentService {
      async execute({tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
     const complimentsRepositories = getCustomRepository(
       ComplimentsRepositories
     )
     const usersRepositories = getCustomRepository(UsersRepositories)
      
      //verificar se user sender != user receiver
      
      if(user_sender === user_receiver) {
         throw new Error("You can not send a compliment to yourself")
       }

      //verificar se o usuário que receberá o elogio existe
      const userReceiverExists = await usersRepositories.findOne(user_receiver)

    if (!userReceiverExists){
      throw new Error("User Receiver does not exists!")
    }

      //criar o elogio e salvá-lo
      const compliment = complimentsRepositories.create({tag_id, user_receiver, user_sender, message});
   
       await complimentsRepositories.save(compliment)
   
       return compliment
     }
   }
   
   export { CreateComplimentService }