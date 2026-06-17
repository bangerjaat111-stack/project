import express from 'express'
import mongoose from 'mongoose' 
import {router} from '../src/routes/routes.js'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
app.use(express.json())
dotenv.config();
app.use(cors());
const port = process.env.PORT || 2020
mongoose.connect(process.env.MongooseDBUrl)
    .then(() => console.log("mongoose db is connected"))
    .catch((err) => console.log(err.message))

app.use('/',router)
app.listen(port, () => console.log(`server is running on port http://localhost:${port}`))