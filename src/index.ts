import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import cors from '@koa/cors'
import dotenv from 'dotenv'
import router from './routes'
import errorHandler from './middleware/errorHandler'

dotenv.config()
const app = new Koa()

app.use(cors({
  origin: 'https://contact-app.wilmerrcz.dev'
}))

app.use(errorHandler)
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = 4000

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch(err => {
    console.log('Error connecting to Mongo', err)
  })
