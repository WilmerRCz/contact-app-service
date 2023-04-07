import { Context, Next } from 'koa'
import ServiceError from '../errors/ServiceError'
import { getBearerToken, verifyToken } from '../utils/jwt'

export default async function authHandler (ctx: Context, next: Next) {
  const { authorization } = ctx.header
  const token = getBearerToken(authorization)

  try {
    const tokenPayload = verifyToken(token)
    ctx.state.user = {
      id: tokenPayload.sub
    }
  } catch (err) {
    const error = err as ServiceError
    throw new ServiceError(401, error.message)
  }
  await next()
}
