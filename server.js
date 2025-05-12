import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import chalk from 'chalk';
import TaskRouter from './routes/taskRouter.js'
//configuration
dotenv.config();

//Express Config
const app = express()

//Cross Origin for CORS
app.use(cors())

//for Postman testing 
app.use(express.json())

//Morgan
//app.use(morgan('tiny'))
//Server config
const port = process.env.PORT || 6969;
const Hostname = process.env.HOSTNAME;

//Router Config
app.use('/api/tasks', TaskRouter)

//Database Connection
mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log(chalk.white('MongoDB Connected Successfully!'))
})
.catch((err) => {
    console.log(err)
})

//Server listen port Config
app.listen(port, () => {
    console.log(chalk.white(`Server Started on port ${port} running on Hostname ${Hostname} `))
})