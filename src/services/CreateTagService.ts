import { getCustomRepository } from 'typeorm';
import { TagsRepositories } from '../repositories/TagsRepositories';


class CreateTagService{
   async execute(name: string){
      const tagsRepositories = getCustomRepository(TagsRepositories)

      //verificar se a tag tem nomepreenchido (pode fazer uso de biblioteca)
      if(!name){
         throw new Error('Incorrect name!')
      }

      //verificar se o nome da tag já existe
      const tagAlreadyExists = await tagsRepositories.findOne({
         name
      })

      if(tagAlreadyExists){
         throw new Error('Tag already exists!')
      }

      //se não existir, a tag é criada e salva
      const tag = tagsRepositories.create({
         name
      })
      await tagsRepositories.save(tag)

      return tag
   }
}

export { CreateTagService }