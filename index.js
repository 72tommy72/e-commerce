import express from 'express'
import dotenv from "dotenv";
import {connectDB} from './DB/connectionDB.js'
import { appRouter } from './src/appRouter.js';
dotenv.config()
const app = express()
const port = process.env.PORT

//connectDB
connectDB()
//
appRouter(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))