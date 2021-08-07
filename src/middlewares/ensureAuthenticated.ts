import express, { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload{
   sub:string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  
   //receber token
   const authToken = request.headers.authorization
   //verificar se o token está preenchido e é válido
   if(!authToken){
      return response.status(401).end()
   }

   const [, token] = authToken.split(" ")

   try{
      const { sub } = verify(token,"05022dcd01cbd59fffec94bb04ff0aac") as IPayload
      
      //recuperar informações do user
      request.user_id = sub
      
      return next() 
   }catch(err){
      return response.status(401).end()
   }
}