import { Context } from 'koa'
import { ValidationError } from 'joi'
import { authLoginSchema } from '../../schemas/auth.schema'
import { UserLoginRequestDTO } from '../../@types/dto'
import ServiceError from '../../errors/ServiceError'
import User from '../../models/User'
import { comparePassword } from '../../utils/bcrypt'
import { signToken } from '../../utils/jwt'

async function login (ctx: Context) {
  const payload = ctx.request.body as UserLoginRequestDTO
  try {
    const validated: UserLoginRequestDTO = await authLoginSchema.validateAsync(payload)
    const userAccount = await User.findOne({ email: validated.email })
    if (!userAccount) {
      throw new ServiceError(401)
    }

    const isPasswordValid = await comparePassword(validated.password, userAccount.password)
    if (!isPasswordValid) {
      throw new ServiceError(401)
    }

    ctx.status = 200
    ctx.body = {
      token: signToken({ sub: userAccount.id })
    }
  } catch (err) {
    const validationError = err as ValidationError
    console.log(err)
    if (validationError.isJoi) {
      throw new ServiceError(400, 'Invalid credentials')
    }
    throw err
  }
}

export default login
