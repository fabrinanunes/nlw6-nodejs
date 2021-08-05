import "reflect-metadata"
import express, { Request, Response, NextFunction } from "express"
import "./database" //não precisa definir o index
import { router } from "./routes"

const app = express()

app.use(express.json())
app.use(router)
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
   if(err instanceof Error){
      return response.status(400).json
   }
})

app.listen(3000, () => console.log("Server is Running"))