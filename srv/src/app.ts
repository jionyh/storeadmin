import 'express-async-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import router from './routes'

const app = express()

app.use(morgan('tiny'))

app.use(cors())

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

/* app.use((req:Request, res:Response, next:NextFunction)=>{
    res.json({hello: 'world'})
}) */

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message)
})

export default app
