//acesso ao request&response
//funcionalidade: pegar as informações do server(rota) e repassar para o service
import { Request, Response } from "express"
import { CreateUserService } from "../services/CreateUserService"

class CreateUserController {
   async handle(request: Request, response: Response) {
     const { name, email, admin, password } = request.body;
 
     const createUserService = new CreateUserService();
 
     const user = await createUserService.execute({name, email, admin, password});
 
     return response.json(user);
   }
}

export { CreateUserController }