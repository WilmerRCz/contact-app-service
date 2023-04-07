import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './routes'
import errorHandler from './middleware/errorHandler'

dotenv.config()
const app = new Koa()

app.use(errorHandler)
app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods())

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(4000, () => {
      console.log('Server is running on port 4000')
    })
  })
  .catch(err => {
    console.log('Error connecting to Mongo', err)
  })
