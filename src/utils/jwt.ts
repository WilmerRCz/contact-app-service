import jwt from 'jsonwebtoken'
import ServiceError from '../errors/ServiceError'

export const signToken = (payload: Record<string, unknown>) => (
  jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '7d' })
)

export const verifyToken = (token: string) => (
  jwt.verify(token, process.env.JWT_SECRET as string)
)

export const getBearerToken = (authorization: string | undefined) => {
  const [prefix, token] = authorization?.split(' ') || []
  if (prefix !== 'Bearer' || !token) {
    throw new ServiceError(401, 'Invalid Token')
  }
  return token
}
