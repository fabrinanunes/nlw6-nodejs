import express, { request, response } from "express"
import "reflect-metadata"

const app = express()

app.listen(3000, () => console.log('Server is running'))
