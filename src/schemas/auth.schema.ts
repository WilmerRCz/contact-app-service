import Joi from 'joi'

export const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const authRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/)
    .error(new Joi.ValidationError(
      'Password must contain at least 8 characters , one uppercase letter, one lowercase letter, one number and one special character',
      [],
      'password'
    )),
  firstName: Joi.string().required().min(3).max(30),
  lastName: Joi.string().required().min(3).max(30)
})
