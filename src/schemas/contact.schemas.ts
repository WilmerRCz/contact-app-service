import Joi from 'joi'

const contactBaseSchema = {
  firstName: Joi.string(),
  lastName: Joi.string(),
  birth: Joi.string(),
  phone: Joi.string(),
  image: Joi.string().uri(),
  email: Joi.string().email(),
  company: Joi.string(),
  address: Joi.string(),
  website: Joi.string().uri(),
  customField: Joi.string(),
  dataCustomField: Joi.string()
}

export const contactCreateSchema = Joi.object({
  ...contactBaseSchema,
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

export const contactUpdateSchema = Joi.object(contactBaseSchema).required()
