import express, {Request, Response, NextFunction, ErrorRequestHandler} from 'express'

import mongoose from "mongoose"
import cors from 'cors'
import bodyParser from "body-parser"

import userDashboard from "./routes/userDashboard"


const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', [ '*' ])
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers","Authorization")
    res.header("Access-Control-Allow-Headers","*")
    next()
})
app.use(userDashboard)
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
})

mongoose.connect('mongodb+srv://george:B3NDO3NmoMfq6S2B@cluster0.zulgb.mongodb.net/cryptoApp')
    .then(() => app.listen(PORT))
    .then(() => console.log(`Connected to DB with mongoose on PORT ${PORT}`))
    .catch(err => console.log(err))