import "reflect-metadata"
import "./database" //não precisa definir o index
import "express-async-errors"
import cors from "cors"
import express, { Request, Response, NextFunction } from "express"
import { router } from "./routes"

const app = express()
//front-end
app.use(cors())

app.use(express.json())
app.use(router)
app.use((err: Error, request: Request, response: Response, next: NextFunction) =>{
   if(err instanceof Error){
      return response.status(400).json({
         error: err.message
      })
   }

   return response.status(500).json({
      status: "error",
      message: "Internal Server Error"
   })
})

app.listen(3000, () => console.log("Server is Running"))