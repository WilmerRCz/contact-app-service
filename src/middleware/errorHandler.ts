import { Context, Next } from 'koa'
import ServiceError from '../errors/ServiceError'

export default async function errorHandler (ctx: Context, next: Next) {
  try {
    await next()
  } catch (err) {
    const validationError = err as ServiceError

    ctx.status = validationError.status || 500
    ctx.body = {
      message: validationError.message
    }
    if (ctx.status === 500) {
      console.log(err)
    }
  }
}
