import { Context } from 'koa'
import { nanoid } from 'nanoid'
import { ValidationError } from 'joi'
import { ContactInputDTO } from '../@types/dto'
import Contact from '../models/Contact'
import { contactCreateSchema, contactUpdateSchema } from '../schemas/contact.schemas'
import ServiceError from '../errors/ServiceError'

async function getAllContacts (ctx: Context) {
  const userId = ctx.state.user.id

  const contacts = await Contact.find({ userId })
  const jsonContacts = contacts.map(contact => contact.toJSON())
  ctx.body = jsonContacts
}

async function getContact (ctx: Context) {
  const id = ctx.params.id as string
  const userId = ctx.state.user.id

  const contact = await Contact.findOne({ id, userId })
  if (contact) {
    ctx.body = contact.toJSON()
  } else {
    ctx.status = 404
  }
}

async function createContact (ctx: Context) {
  const payload = ctx.request.body as ContactInputDTO
  const userId = ctx.state.user.id
  try {
    const validated: ContactInputDTO = await contactCreateSchema.validateAsync(payload)
    const newContact = new Contact({
      id: nanoid(),
      ...validated,
      userId
    })
    const response = await newContact.save()
    ctx.body = response
    ctx.status = 201
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
    throw err
  }
}

async function updateContact (ctx: Context) {
  const id = ctx.params.id
  const payload = ctx.request.body as Partial<ContactInputDTO>
  const userId = ctx.state.user.id

  if (Object.values(payload).length === 0) {
    throw new ServiceError(400, 'No Data To Update')
  }
  try {
    const validated = await contactUpdateSchema.validateAsync(payload)
    const updatedContact = await Contact.findOneAndUpdate({ id, userId }, validated, { new: true })
    if (updatedContact) {
      ctx.body = updatedContact.toJSON()
    } else {
      ctx.status = 404
    }
  } catch (err) {
    const validationError = err as ValidationError
    if (validationError.isJoi) {
      throw new ServiceError(400, validationError.message)
    }
    throw err
  }
}

async function deleteContact (ctx: Context) {
  const id = ctx.params.id
  const userId = ctx.state.user.id

  await Contact.findOneAndDelete({ id, userId })
  ctx.status = 204
}

export default {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact
}
