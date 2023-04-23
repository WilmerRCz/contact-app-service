import Joi from 'joi'

const contactBaseSchema = {
  firstName: Joi.string().allow(''),
  lastName: Joi.string().allow(''),
  birth: Joi.string().allow(''),
  phone: Joi.string().allow(''),
  image: Joi.string().allow(''),
  email: Joi.string().allow(''),
  company: Joi.string().allow(''),
  address: Joi.string().allow(''),
  website: Joi.string().uri().allow(''),
  customField: Joi.string().allow(''),
  dataCustomField: Joi.string().allow('')
}

export const contactCreateSchema = Joi.object({
  ...contactBaseSchema,
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
})

export const contactUpdateSchema = Joi.object(contactBaseSchema).required()
